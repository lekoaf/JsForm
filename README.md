## JsForm
An API to dynamically add forms to your website.

## Why?
Why not?

## Todo
* Find out what attributes the different inputs have
* Implement select
* Implement textarea
* Implement checkbox
* Implement radiobutton
* Implement render function
* Add form attributes
* Global and local whitelist?

## API

```Javascript
var form = new JsForm('login.php', 'POST');

form
  .label('Text')
  .inputText('hej', 'form-control', {maxlength: 5})
  .label('Number')
  .inputNumber('tjo', 'form-control', {min: 0, max: 100})
  .label('Password')
  .inputPassword(null, 'form-control', {placeholder: 'Password', value: 'hunter2'})
  .label('Email')
  .inputEmail(null, 'form-control')
  .label('Phone')
  .inputTel(null, 'form-control')
  .inputButton(null, 'btn btn-default', {value: 'Send'})
  .render('output', 'form-horizontal');
 ```