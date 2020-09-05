using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayHeadController : MonoBehaviour {

    private GameObject rightWall;
    private Vector3 endingPosition;

    public Vector3 CurrentPosition {
        get {
            return transform.position;
        }
    }

    private void Awake() {
        rightWall = GameObject.Find("RightBoundary");
    }

    public IEnumerator MoveOverSeconds() {
        float elapsedTime = 0f;
        Vector3 startingPosition = transform.position;
        endingPosition = new Vector3(rightWall.transform.position.x, transform.position.y, transform.position.z);

        while (elapsedTime < GameController.Instance.DURATION) {
            elapsedTime += Time.deltaTime / GameController.Instance.DURATION;
            transform.position = Vector3.Lerp(startingPosition, endingPosition, elapsedTime);
            yield return null;
        }

        transform.position = endingPosition;
    }

    public void ReturnToOriginalPosition() {
        transform.position = GameObject.Find("LeftBoundary").transform.position;
    }
}
