/* 

Copyright (C) Cortic Technology Corp. - All Rights Reserved
Written by Michael Ng <michaelng@cortic.ca>, December 2019
  
 */

async function ajax_post(url, data) {
  return $.ajax({
    url: url,
    type: 'POST',
    data: data
  });
}

function cait_switch_lang() {
  var language = document.getElementById("languageDropdown").value;
  $.post("/switchlang", { "language": language })
    .done(function (data) {
      if (data['result']) {
        url = window.location.protocol + "//" + window.location.hostname + "/programming";
        window.location.href = url;
      }
    });
}

async function cait_enable_drawing_mode(mode) {
  try {
    await ajax_post("/enable_drawing_mode", { 'mode': mode });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_draw_detected_face(face) {
  try {
    await ajax_post("/draw_detected_face", { 'face': JSON.stringify(face['coordinates']) });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_draw_recognized_face(people) {
  try {
    await ajax_post("/draw_recognized_face", { "coordinates": JSON.stringify(people['coordinates']), "names": JSON.stringify(people['names']) });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_draw_detected_objects(objects) {
  try {
    await ajax_post("/draw_detected_objects", { 'names': JSON.stringify(objects['names']), "coordinates": JSON.stringify(objects['coordinates']) });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_draw_estimated_emotions(emotions) {
  try {
    await ajax_post("/draw_estimated_emotions", { 'emotions': JSON.stringify(emotions['emotions']) });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_draw_estimated_facemesh(facemesh) {
  try {
    await ajax_post("/draw_estimated_facemesh", { 'facemesh': JSON.stringify(facemesh["facemesh"]) });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_draw_estimated_body_landmarks(pose) {
  try {
    await ajax_post("/draw_estimated_body_landmarks", { 'body_landmarks_coordinates': JSON.stringify(pose["body_landmarks_coordinates"]) });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_draw_estimated_hand_landmarks(hands) {
  try {
    await ajax_post("/draw_estimated_hand_landmarks", {
      "hand_landmarks_coordinates": JSON.stringify(hands["hand_landmarks_coordinates"]),
      "hand_bboxes": JSON.stringify(hands["hand_bboxes"]),
      "handnesses": JSON.stringify(hands["handnesses"])
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}


async function cait_detect_face(processor) {
  try {
    const res = await ajax_post("/detectface", { 'spatial': spatial_face_detection, 'processor': processor });
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_recognize_face() {
  try {
    const res = await ajax_post("/recognizeface", {});
    //console.log(res);
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_add_person(name) {
  try {
    const res = await ajax_post("/addperson", { 'name': name });
    // console.log(res);
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_delete_person(name) {
  try {
    const res = await ajax_post("/removeperson", { 'name': name });
    // console.log(res);
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_detect_objects() {
  try {
    const res = await ajax_post("/detectobject", { 'spatial': spatial_object_detection });
    //console.log(res);
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_classify_image() {
  try {
    const res = await ajax_post("/classifyimage", {});
    //console.log(res);
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_facemesh_estimation() {
  try {
    const res = await ajax_post("/facemesh_estimation", {});
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_face_emotions_estimation() {
  try {
    const res = await ajax_post("/face_emotions_estimation", {});
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_get_hand_landmarks() {
  try {
    const res = await ajax_post("/get_hand_landmarks", {});
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_get_body_landmarks() {
  try {
    const res = await ajax_post("/get_body_landmarks", {});
    if (res['success'] == false) {
      throw new Error(res["error"] + ". Please fix the problem and click Run again.");
    }
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_listen() {
  try {
    const res = await ajax_post("/listen", {});
    console.log(res);
    if (res['success'] == false) {
      alert(res["text"] + ". Please fix the problem and click Run again.");
    }
    return res['text'];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_say(text) {
  try {
    console.log("Saying: " + text)
    const res = await ajax_post("/say", { 'text': text });
    console.log(res);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_analyze(text) {
  try {
    const res = await ajax_post("/analyze", { 'text': text });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_set_motor_position(hub_name, motor_name, position) {
  try {
    const res = await ajax_post("/set_motor_position", { 'hub_name': hub_name, 'motor_name': motor_name, 'position': position });
    console.log(res);
    if (res['success'] == false) {
      alert(res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}


async function cait_set_motor_power(hub_name, motor_name, power) {
  try {
    const res = await ajax_post("/set_motor_power", { 'hub_name': hub_name, 'motor_name': motor_name, 'power': power });
    console.log(res);
    if (res['success'] == false) {
      alert(res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_rotate_motor(hub_name, motor_name, angle) {
  try {
    const res = await ajax_post("/rotate_motor", { 'hub_name': hub_name, 'motor_name': motor_name, 'angle': angle });
    console.log(res);
    if (res['success'] == false) {
      alert(res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_control_motor(hub_name, motor_name, speed, duration) {
  try {
    const res = await ajax_post("/control_motor", { 'hub_name': hub_name, 'motor_name': motor_name, "speed": speed, "duration": duration });
    console.log(res);
    if (res['success'] == false) {
      alert(res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}


async function cait_control_motor_group(operation_list) {
  try {
    dataToSend = JSON.stringify({ 'operation_list': operation_list });
    const res = await ajax_post("/control_motor_group", { 'data': dataToSend });
    console.log(res);
    if (res['success'] == false) {
      alert(res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_init(component_name, mode = "online", processor = "local", account = "default", language = "english") {
  try {
    loader.style.display = "flex";
    document.getElementById("loading_text").innerHTML = "Initializing " + component_name + " component...";
    var res;
    if (Array.isArray(mode)) {
      res = await ajax_post("/initialize_component", { 'component_name': component_name, 'mode': JSON.stringify(mode), 'processor': processor, 'account': account, 'language': language });
    }
    else {
      res = await ajax_post("/initialize_component", { 'component_name': component_name, 'mode': mode, 'processor': processor, 'account': account, 'language': language });
    }
    loader.style.display = "none";
    if (res['success'] == false) {
      alert("Initialization of " + component_name + " failed.  " + res["error"]);
      throw new Error("Initialization of " + component_name + " failed.  " + res["error"] + ". Please fix the problem and click Run again.");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_set_module_parameters(parameter_name, value) {
  try {
    loader.style.display = "flex";
    document.getElementById("loading_text").innerHTML = "Setting parameter values...";
    const res = await ajax_post("/change_module_parameters", { 'parameter_name': parameter_name, "value": value });
    console.log(res);
    loader.style.display = "none";
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_sleep(time) {
  try {
    const res = await ajax_post("/sleep", { "time": time });
    console.log(res);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_init_vision(mode, processor) {
  await cait_init("vision", mode, processor);
  stopStreaming = false;
}

async function cait_init_voice(mode, account, language) {
  await cait_init("voice", mode, "local", account, language);
}

async function cait_init_nlp(mode) {
  await cait_init("nlp", mode);
}

async function cait_init_control(mode) {
  await cait_init("control", mode);
}

async function cait_init_smarthome() {
  await cait_init("smarthome");
}

async function cait_init_pid(kp, ki, kd) {
  try {
    const res = await ajax_post("/init_pid", { "kp": kp, "ki": ki, "kd": kd });
    console.log(res);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_update_pid(error) {
  try {
    const res = await ajax_post("/update_pid", { "error": error });
    console.log(res);
    return res['value'];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_control_light(device_name, operation, parameter) {
  try {
    //console.log("device name: " + device_name + ", operation: " + operation);
    const res = await ajax_post("/control_light", { 'device_name': device_name, 'operation': operation, 'parameter': parameter });
    console.log(res);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function cait_get_name(intention) {
  if (((intention)['topic']) == 'user_give_name') {
    entities = ((intention)['entities'])[0];
    name = ((entities)['entity_value']);
  }
  return name;
}

async function cait_control_media_player(device_name, operation) {
  try {
    //console.log("device name: " + device_name + ", operation: " + operation);
    const res = await ajax_post("/control_media_player", { 'device_name': device_name, 'operation': operation });
    console.log(res);
  } catch (err) {
    console.log(err);
    return err;
  }
}