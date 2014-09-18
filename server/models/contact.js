'use strict';

var Mongo  = require('mongodb');

function Contact(ownerId,o){
  this.ownerId  = Mongo.ObjectID();
  this.fname    = o.fname;
  this.lname    = o.lname;
  this.phone    = o.phone;
  this.email    = o.email;
  this.street   = o.street;
  this.city     = o.city;
  this.zip      = o.zip;
  this.bday     = o.bday;
  this.photo    = o.photo;
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(o,cb){
  var c = new Contact(o);
  Contact.collection.save(c,cb);
};

Contact.all = function(cb){
  Contact.collection.find().toArray(cb);
};

Contact.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Contact.collection.findOne({_id:_id}, cb);
};

Contact.prototype.save = function(fields, cb){
  var properties = Object.keys(fields),
      self       = this;

  properties.forEach(function(property){
    self[property] = fields[property][0];
  });

  /*this.photo = uploadPhoto(file, '/img/' + this._id);*/

  Contact.collection.save(this, cb);
};

module.exports = Contact;
