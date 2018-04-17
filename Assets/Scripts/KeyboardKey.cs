using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class KeyboardKey : MonoBehaviour {

    private event Action<KeyboardKey> OnKeyPress;
    private AudioSource audioNote;
    private float pressedAt;
    [SerializeField] private string keyName;
    [SerializeField] private Sprite note;

    public AudioSource AudioNote {
        get {
            return audioNote;
        }
    }

    public int Index {
        get {
            return transform.GetSiblingIndex();
        }
    }

    public string Name {
        get {
            return transform.name;
        }
    }

    public Sprite Note {
        get {
            return note;
        }
    }

    public float PlayedAt {
        get {
            return pressedAt;
        }
    }

	void Awake() {
        transform.GetComponent<Button>().onClick.AddListener(AddNote);
        audioNote = transform.GetComponent<AudioSource>();
    }

    private void Subscribe() {
        OnKeyPress += GameController.Instance.OnKeyPress;
    }

    private void Start() {
        Subscribe();
    }

    private void AddNote() {
        pressedAt = Time.time;
        PlayNote();
        OnKeyPress(gameObject.GetComponent<KeyboardKey>());
	}

    public void PlayNote() {
        audioNote.Play();
    }
}
