using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIController : MonoBehaviour {

    [Serializable]
    private struct ButtonImages {
        public Sprite sprite;
        public Sprite pressedSprite;
    }

    [SerializeField] private ButtonImages playImages = new ButtonImages();
    [SerializeField] private ButtonImages stopImages = new ButtonImages();
    [SerializeField] private GameObject eraseGameObject;
    [SerializeField] private GameObject notePrefab;
    [SerializeField] private GameObject playStopGameObject;
    [SerializeField] private GameObject playHeadGameObject;

    private event Action EraseSongPressed;
    private event Action PlayStopPressed;
    private bool playStopPressed = false;
    private Button eraseButton;
    private Button playStopButton;
    private GameObject bottomWall;
    private GameObject notePanel;
    private GameObject topWall;
    private PlayHeadController playHead;

    private void Awake() {
        eraseButton = eraseGameObject.GetComponent<Button>();
        playHead = playHeadGameObject.GetComponent<PlayHeadController>();
        playStopButton = playStopGameObject.GetComponent<Button>();
        bottomWall = GameObject.Find("BottomBoundary");
        notePanel = GameObject.Find("NotePanel");
        topWall = GameObject.Find("TopBoundary");

        eraseButton.onClick.AddListener(EraseSong);
        playStopButton.onClick.AddListener(PlaySong);
        eraseGameObject.SetActive(false);
        playStopGameObject.SetActive(false);

        GameObject.Find("MiddleSecondsText").GetComponent<Text>().text = (GameController.Instance.DURATION / 2).ToString() + "s";
        GameObject.Find("EndSecondsText").GetComponent<Text>().text = (GameController.Instance.DURATION).ToString() + "s";
    }

    private void Subscribe() {
        EraseSongPressed += GameController.Instance.OnEraseSong;
        PlayStopPressed += GameController.Instance.OnPlaySong;
        GameController.Instance.DonePlaying += OnDonePlaying;
        GameController.Instance.DoneRecording += OnDoneRecording;
        GameController.Instance.NotePlayed += OnNotePlayed;
    }

    void Start () {
        Subscribe();
    }

	private void EraseSong() {
        GameObject[] notes = GameObject.FindGameObjectsWithTag("Note");

        foreach(GameObject note in notes) {
            Destroy(note);
        }

        eraseGameObject.SetActive(false);
        playStopGameObject.SetActive(false);
        playHead.ReturnToOriginalPosition();

        if (EraseSongPressed != null)
            EraseSongPressed();
    }

    private void OnDonePlaying() {
        ToggleButtonImage(playStopButton, playImages);
        playStopPressed = false;
        playHead.ReturnToOriginalPosition();
    }

    private void OnDoneRecording() {
        eraseGameObject.SetActive(true);
        playStopGameObject.SetActive(true);
    }

    private void OnNotePlayed(KeyboardKey key) {
        StartCoroutine(playHead.MoveOverSeconds());

        float height = topWall.transform.position.y - bottomWall.transform.position.x;
        float spacing = height / GameController.Instance.KeysAmount;
        spacing = bottomWall.transform.position.y - (spacing * (key.Index + 1));

        // TODO Spawner/Pool?
        Vector3 position = new Vector3(playHead.CurrentPosition.x, spacing, notePrefab.transform.position.z);
        GameObject clone = Instantiate(notePrefab, position, notePrefab.transform.rotation);
        clone.GetComponent<Image>().sprite = key.Note;
        clone.transform.position = position;
        clone.transform.SetParent(notePanel.transform);
    }

    private void PlaySong() {
        if (playStopPressed == true) {
            OnDonePlaying();
            // TODO Break song loop
        } else {
            ToggleButtonImage(playStopButton, stopImages);
            playStopPressed = true;
        }

        if (PlayStopPressed != null)
             PlayStopPressed();
    }

    private void ToggleButtonImage(Button button, ButtonImages images) {
        button.GetComponent<Image>().sprite = images.sprite;
        SpriteState spriteState = new SpriteState { pressedSprite = images.pressedSprite };
        button.spriteState = spriteState;
    }
}
