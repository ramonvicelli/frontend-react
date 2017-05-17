import PubSub from 'pubsub-js';

export default class ErrorHandler {
  publisher(errors) {
    errors.forEach(error => PubSub.publish('error-validation', error));
  }
}
