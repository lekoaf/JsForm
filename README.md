## JsForm
An API to dynamically add forms to your website.

## Why?
Why not?

## Todo
* Find out what attributes the different inputs have
* Implement select
* ~~Implement textarea~~
* Implement checkbox
* Implement radiobutton
* Implement render function
* Add form attributes
* Global and local whitelist?
* Add possibility to add event to an element?

## API

```Javascript
var form = new JsForm('login.php', 'POST');

form
  .label('Text')
  .inputText({id: 'elId1', class: 'form-control', maxlength: 5})
  .label('Number')
  .inputNumber({id: 'elId2', class: 'form-control', min: 0, max: 100})
  .label('Password')
  .inputPassword({id: 'elId3', class: 'form-control', placeholder: 'Password', value: 'hunter2'})
  .label('Email')
  .inputEmail({id: 'elId4', class: 'form-control'})
  .label('Phone', 'elId5')
  .inputTel({id: 'elId5', class: 'form-control'})
  .label('Textarea')
  .textarea({class: 'form-control', rows: 5, cols: 100, placeholder: 'Write something here'})
  .inputButton({id: 'elId6', class: 'btn btn-default', value: 'Send'},
    [{type: 'click', callback: function () {
      console.log('Button clicked');
    }}])
  .render('output', 'form-horizontal');
 ```