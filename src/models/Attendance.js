const { v4: uuid } = require("uuid");

class Attendance {
  constructor(client, pet, service, status, observations, data) {
    this._id = uuid();
    this._client = client;
    this._pet = pet;
    this._service = service;
    this._status = status;
    this._observations = observations;
    this._data = new Date(data);
    this._createdAt = new Date();
  }

  get id() {
    return this._id;
  }

  get client() {
    return this._client;
  }

  get pet() {
    return this._pet;
  }

  get service() {
    return this._service;
  }

  get status() {
    return this._status;
  }

  get observations() {
    return this._observations;
  }

  get data() {
    return new Date(this._data);
  }

  get createdAt() {
    return new Date(this._createdAt);
  }
}

module.exports = Attendance;
