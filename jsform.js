'use strict';

function JsForm(action, method) {
  var fields = [];
  var attrWhiteList = [
    'value',
    'placeholder',
    'min',
    'max',
    'maxlength',
    'disabled',
    'readonly',
    'size',
    'height',
    'width',
    'step'
  ];

  var inputs = function (type, id, inputClass, attr) {
    if (validateInput(id, inputClass, attr)) {
      fields.push({
        field: 'input',
        type: type,
        id: id,
        class: inputClass,
        attr: attr
      });
    }
  }.bind(this);

  var validateInput = function (id, inputClass, attr) {
    if (typeof id !== 'string' && id !== null) {
      throw new Error('ID must be either null or a string');
    }
    if (typeof inputClass !== 'string' && inputClass !== null) {
      throw new Error('Class must be either null or a string');
    }
    if (attr !== undefined && typeof attr !== 'object' || Array.isArray(attr)) {
      throw new Error('Attributes must be an object or undefined');
    }
    return true;
  };

  return {
    render: function (where, formClass) {
      if (!where) {
        throw new Error('You need to specify an element id where you want to attach the form');
      }
      var output = document.getElementById(where);
      var form = document.createElement('form');
      form.setAttribute('method', method);
      form.setAttribute('action', action);
      if (formClass) {
        form.setAttribute('class', formClass);
      }

      fields.forEach(function (f) {
        var element = document.createElement(f.field);

        for (var p in f) {
          if (f.hasOwnProperty(p) && f[p]) {
            if (p !== 'attr' && p !== 'field') {
              element.setAttribute(p, f[p]);
            }
          }
        }

        // Attributes
        if (f.attr) {
          for (var pr in f.attr) {
            if (f.attr.hasOwnProperty(pr) && attrWhiteList.indexOf(pr) !== -1) {
              element.setAttribute(pr, f.attr[pr]);
            } else {
              throw new Error('You have used an attribute that is not in the whitelist: ' +
                attrWhiteList.join(', ') + '.');
            }
          }
        }

        form.appendChild(element);
      });
      output.appendChild(form);
    },
    inputText: function (id, inputClass, attr) {
      // attr = maxlength, placeholder, value
      inputs('text', id, inputClass, attr);
      return this;
    },

    inputNumber: function (id, inputClass, attr) {
      // attr = min, max, placeholder, value
      inputs('number', id, inputClass, attr);
      return this;
    },

    inputPassword: function (id, inputClass, attr) {
      inputs('password', id, inputClass, attr);
      return this;
    },

    inputEmail: function (id, inputClass, attr) {
      inputs('email', id, inputClass, attr);
      return this;
    },

    inputTel: function (id, inputClass, attr) {
      inputs('tel', id, inputClass, attr);
      return this;
    },

    inputRange: function () {

    },

    inputButton: function (id, inputClass, attr) {
      inputs('button', id, inputClass, attr);
      return this;
    },

    inputSubmit: function (id, inputClass, attr) {
      inputs('submit', id, inputClass, attr);
      return this;
    },

    textarea: function () {
      fields.push({

      });
      return this;
    },

    select: function () {
      fields.push({

      });
      return this;
    }
  };
}

/*

input:
  text
  number
  password
  submit
  radio
  checkbox
  button
  color
  email
  tel
  range

select
textarea

*/