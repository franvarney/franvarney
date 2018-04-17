using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Loader : MonoBehaviour {

    [SerializeField] private GameObject gameController;

    void Awake() {
        if (GameController.Instance == null)
            Instantiate(gameController);
    }
}
