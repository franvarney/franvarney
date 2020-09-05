using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour {

    private static GameController instance;

    // State values
    public bool isRecording = false;
    public float startTime = 0f;
    public List<KeyboardKey> song;

    public event Action DonePlaying;
    public event Action DoneRecording;
    public event Action<KeyboardKey> NotePlayed;
    public event Action StartRecording;
    [SerializeField] public readonly float DURATION = 5f;
    private float elapsedTime = 0f;
    private GameObject notePanelGameObject;
    public Coroutine play;

    public static GameController Instance {
        get {
            return instance;
        }
        set {
            instance = value;
        }
    }

    public int KeysAmount {
        get {
            return notePanelGameObject.transform.childCount;
        }
    }

    private void Awake() {
        if (instance == null)
            instance = this;
        else if (instance != this)
            Destroy(gameObject);
    }

    private void Start() {
        notePanelGameObject = GameObject.Find("KeyboardPanel");
    }

    void Update () {
        if (isRecording == true) {
            elapsedTime += Time.deltaTime;

            if (elapsedTime >= DURATION) {
                isRecording = false;
                elapsedTime = 0f;
                if (DoneRecording != null)
                    DoneRecording();
            }
        }
    }

    public void OnEraseSong() {
        song.Clear();
    }

    public void OnKeyPress(KeyboardKey key) {
        if (isRecording == false && song.Count <= 0) {
            startTime = Time.time;
            isRecording = true;
            if (StartRecording != null) {
                StartRecording();
            }
        }

        if (isRecording == true) {
            song.Add(key);
            if (NotePlayed != null) {
                NotePlayed(key);
            }
        }
    }

    // TODO Fix and move to filter class
    private IEnumerator Echo(KeyboardKey key) {
        int echoAmount = 2;

        while (echoAmount-- > 0) {
            key.AudioNote.volume *= 0.25f;
            yield return new WaitForSecondsRealtime(0.025f);
            key.PlayNote();
        }

        key.AudioNote.volume = 1;
    }

    private IEnumerator Play() {
        // TODO Check for filter toggle and apply it
        Debug.Log(song.Count + "---------");
        float lastPlayedTime = startTime;

        for (int i = 0; i < song.Count; ++i) {
            KeyboardKey key = song[i];
            Debug.Log(key.Name + " times");
            Debug.Log(key.PlayedAt + "/" + lastPlayedTime);
            Debug.Log(key.PlayedAt - lastPlayedTime);
            yield return new WaitForSecondsRealtime(key.PlayedAt - lastPlayedTime);
            key.PlayNote();
            lastPlayedTime = key.PlayedAt;
        }

        if (DonePlaying != null) {
            DonePlaying();
        }
    }

    public void OnPlaySong() {
        play = StartCoroutine(Play());
    }
}
