# Python code generated by CAIT's Visual Programming Interface

import cait.essentials

objects = None

def setup():
    cait.essentials.initialize_component('vision', processor='oakd', mode=[["add_rgb_cam_node", 640, 360], ["add_rgb_cam_preview_node"],["add_stereo_cam_node", False], ["add_stereo_frame_node"],["add_spatial_mobilenetSSD_node", "object_detection", "ssdlite_mbv2_coco.blob", 300, 300, 0.5]])
    
def main():
    global objects
    while True:
        objects = cait.essentials.detect_objects(spatial=True)
        cait.essentials.draw_detected_objects(objects)

if __name__ == "__main__":
    setup()
    main()