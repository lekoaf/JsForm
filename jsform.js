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
    'class',
    'rows',
    'cols'
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

  var validateInput = function (type, attr) {
    if (inputTypeWhiteList.indexOf(type) === -1) {
      throw new Error('Inproper type used');
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
    input: function (type, attr) {
      if (validateInput(type, attr)) {
        fields.push({
          field: 'input',
          type: type,
          attr: attr
        });
      }
      return this;
    },

    inputText: function (attr) {
      // attr = maxlength, placeholder, value
      this.input('text', attr);
      return this;
    },

    inputNumber: function (attr) {
      // attr = min, max, placeholder, value
      this.input('number', attr);
      return this;
    },

    inputPassword: function (attr) {
      this.input('password', attr);
      return this;
    },

    inputEmail: function (attr) {
      this.input('email', attr);
      return this;
    },

    inputTel: function (attr) {
      this.input('tel', attr);
      return this;
    },

    inputRange: function () {
      // Not yet implemented
      return this;
    },

    inputButton: function (attr) {
      this.input('button', attr);
      return this;
    },

    inputSubmit: function (attr) {
      this.input('submit', attr);
      return this;
    },

    textarea: function (attr) {
      fields.push({
        field: 'textarea',
        attr: attr
      });
      return this;
    },

    select: function (attr) {
      // Not yet implemented
      return this;
    },

    checkbox: function (attr) {
      // Not yet implemented
      return this;
    },

    radio: function (attr) {
      // Not yet implemented
      return this;
    },

    label: function (str, labelFor) {
      fields.push({
        field: 'label',
        text: str,
        for: labelFor
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