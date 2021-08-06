""" 
This example demostrate how to add and delete a person from the 
face recognition worker's database. A new person is frist added
to the database, then the face recognition worker can recognize
this person. The person is then deleted after 30 frames of recognition.

"""

import time
import numpy as np
from curt.command import CURTCommands

# Modify these to your own workers
# Format is "<host_name>/<module_type>/<service_name>/<worker_name>"
OAKD_PIPELINE_WORKER = "charlie/vision/oakd_service/oakd_pipeline"
RGB_CAMERA_WORKER = "charlie/vision/oakd_service/oakd_rgb_camera_input"
FACE_DETECTION_WORKER = "charlie/vision/oakd_service/oakd_face_detection"
FACE_RECOGNITION_WORKER = "charlie/vision/oakd_service/oakd_face_recognition"
person_name_to_add = "Michael"

CURTCommands.initialize()

oakd_pipeline_config = [
    ["add_rgb_cam_node", 640, 360, False],
    ["add_rgb_cam_preview_node"],
    [
        "add_nn_node_pipeline",
        "face_detection",
        "face-detection-retail-0004_openvino_2021.2_6shave.blob",
        300,
        300,
    ],
    [
        "add_nn_node",
        "face_landmarks",
        "landmarks-regression-retail-0009_openvino_2021.2_6shave.blob",
        48,
        48,
    ],
    ["add_nn_node", "face_features", "mobilefacenet.blob", 112, 112],
]

oakd_pipeline_worker = CURTCommands.get_worker(
    OAKD_PIPELINE_WORKER
)
CURTCommands.config_worker(oakd_pipeline_worker, oakd_pipeline_config)
time.sleep(5)

rgb_camera_worker = CURTCommands.get_worker(
    RGB_CAMERA_WORKER
)

face_detection_worker = CURTCommands.get_worker(
    FACE_DETECTION_WORKER
)

face_recognition_worker = CURTCommands.get_worker(
    FACE_RECOGNITION_WORKER
)

success = False
removed = False
recog_count = 0

while True:
    rgb_frame_handler = CURTCommands.request(
        rgb_camera_worker, params=["get_rgb_frame"]
    )

    face_detection_handler = CURTCommands.request(
        face_detection_worker, params=["detect_face_pipeline", 0.6, False]
    )

    if not success:
        face_recognition_handler = CURTCommands.request(
            face_recognition_worker,
            params=["add_person", person_name_to_add, rgb_frame_handler, face_detection_handler],
        )
        success = CURTCommands.get_result(face_recognition_handler)["dataValue"]["data"]
    else:
        if recog_count >= 30:
            if not removed:
                face_recognition_handler = CURTCommands.request(
                    face_recognition_worker,
                    params=["remove_person", person_name_to_add],
                )
                removed = CURTCommands.get_result(face_recognition_handler)[
                    "dataValue"
                ]["data"]

        face_recognition_handler = CURTCommands.request(
            face_recognition_worker,
            params=["recognize_face", rgb_frame_handler, face_detection_handler],
        )
        identities = CURTCommands.get_result(face_recognition_handler)["dataValue"][
            "data"
        ]
        recog_count = recog_count + 1
        print(identities)