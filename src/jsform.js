'use strict';

function JsForm(action, method) {
  var fields = [];
  var attrWhiteList = [
    'disabled',
    'class',
    'cols',
    'height',
    'id',
    'max',
    'maxlength',
    'min',
    'name',
    'placeholder',
    'readonly',
    'rows',
    'size',
    'step',
    'value',
    'width',
  ];
  var inputTypeWhiteList = [
    'button',
    'email',
    'hidden',
    'number',
    'password',
    'range',
    'select',
    'submit',
    'tel',
    'text',
    'textarea',
  ];

  var validate = function (type, attr, events) {
    if (inputTypeWhiteList.indexOf(type) === -1) {
      throw new Error('Inproper type used: ' + type);
    }
    if (attr !== undefined && typeof attr !== 'object' || Array.isArray(attr)) {
      throw new Error('Attributes must be an object or undefined');
    }
    if (events && !Array.isArray(events)) {
      throw new Error('Events needs to be an array of objects.');
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

      if (method) {
        form.setAttribute('method', method);
      }
      if (action) {
        form.setAttribute('action', action);
      }

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

        if (f.type) {
          element.setAttribute('type', f.type);
        }


        if (f.events) {
          for (var i = 0; i < f.events.length; i++) {
            element.addEventListener(f.events[i].type, f.events[i].callback, true);
          }
        }

        // Attributes
        if (f.attr) {
          for (var pr in f.attr) {
            if (f.attr.hasOwnProperty(pr) && attrWhiteList.indexOf(pr) !== -1) {
              if (pr === 'value' && typeof f.attr[pr] === 'object' && f.field === 'select') {
                for (var prop in f.attr[pr]) {
                  if (f.attr[pr].hasOwnProperty(prop)) {
                    var option = document.createElement('option');
                    option.value = prop;
                    option.innerHTML = f.attr[pr][prop];
                    element.appendChild(option);
                  }
                }
              } else {
                element.setAttribute(pr, f.attr[pr]);
              }

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

    button: function (attr, events) {
      // this.input('button', attr, events);
      return this;
    },

    checkbox: function (attr, events) {
      return this;
    },

    input: function (type, attr, events) {
      if (validate(type, attr, events)) {
        fields.push({
          field: 'input',
          type: type,
          attr: attr,
          events: events
        });
      }
      return this;
    },

    inputEmail: function (attr, events) {
      this.input('email', attr, events);
      return this;
    },

    inputHidden: function (attr, events) {
      this.input('hidden', attr, events);
      return  this;
    },

    inputNumber: function (attr, events) {
      this.input('number', attr, events);
      return this;
    },

    inputPassword: function (attr, events) {
      this.input('password', attr, events);
      return this;
    },

    inputRange: function (attr, events) {
      this.input('range', attr, events);
      return this;
    },

    inputSubmit: function (attr, events) {
      this.input('submit', attr, events);
      return this;
    },

    inputTel: function (attr, events) {
      this.input('tel', attr, events);
      return this;
    },

    inputText: function (attr, events) {
      this.input('text', attr, events);
      return this;
    },

    label: function (str, labelFor) {
      fields.push({
        field: 'label',
        text: str,
        for: labelFor
      });
      return this;
    },

    radio: function (attr, events) {
      return this;
    },

    select: function (attr, events) {
      if (validate('select', attr, events)) {
        fields.push({
          field: 'select',
          attr: attr,
          events: events
        });
      }
      return this;
    },

    textarea: function (attr, events) {
      if (validate('textarea', attr, events)) {
        fields.push({
          field: 'textarea',
          attr: attr,
          events: events
        });
      }
      return this;
    },
  };
}
