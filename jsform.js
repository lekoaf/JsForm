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
    'step',
    'id',
    'class'
  ];
  var inputTypeWhiteList = [
    'text',
    'number',
    'password',
    'email',
    'tel',
    'range',
    'button',
    'submit'
  ];

  var validateInput = function (type, id, inputClass, attr) {
    if (inputTypeWhiteList.indexOf(type) === -1) {
      throw new Error('Inproper type used');
    }
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

        if (f.field == 'label') {
          element.innerHTML = f.text;
          if (f.for) {
            element.setAttribute('for', f.for);
          }
          form.appendChild(element);
          return;
        }

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
    input: function (type, id, inputClass, attr) {
      if (validateInput(type, id, inputClass, attr)) {
        fields.push({
          field: 'input',
          type: type,
          id: id,
          class: inputClass,
          attr: attr
        });
      }
      return this;
    },

    inputText: function (id, inputClass, attr) {
      // attr = maxlength, placeholder, value
      this.input('text', id, inputClass, attr);
      return this;
    },

    inputNumber: function (id, inputClass, attr) {
      // attr = min, max, placeholder, value
      this.input('number', id, inputClass, attr);
      return this;
    },

    inputPassword: function (id, inputClass, attr) {
      this.input('password', id, inputClass, attr);
      return this;
    },

    inputEmail: function (id, inputClass, attr) {
      this.input('email', id, inputClass, attr);
      return this;
    },

    inputTel: function (id, inputClass, attr) {
      this.input('tel', id, inputClass, attr);
      return this;
    },

    inputRange: function () {

    },

    inputButton: function (id, inputClass, attr) {
      this.input('button', id, inputClass, attr);
      return this;
    },

    inputSubmit: function (id, inputClass, attr) {
      this.input('submit', id, inputClass, attr);
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
    },
    label: function (str, f) {
      fields.push({
        field: 'label',
        text: str,
        for: f
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