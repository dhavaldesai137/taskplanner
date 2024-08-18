// frontend/src/ai/taskAI.js

import * as tf from '@tensorflow/tfjs';

let model;

export const loadModel = async () => {
  model = await tf.loadLayersModel('/task_priority_model_js/model.json');
};

export const predictPriority = async (taskData) => {
  if (!model) {
    await loadModel();
  }

  const inputTensor = tf.tensor2d([taskData], [1, taskData.length]);
  const prediction = model.predict(inputTensor);
  const predictedPriority = prediction.argMax(-1).dataSync()[0];

  return ['Low', 'Medium', 'High'][predictedPriority];
};
