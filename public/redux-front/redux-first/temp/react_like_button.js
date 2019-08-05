'use strict';

const e = React.createElement;
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }
  render() {
    return e(
      'button',
      { onClick: () => this.setState({ liked: this.state.liked?false:true }) },
      this.state.liked?'Liked':'Like this'+", "
    );
  }
}

function Welcome(props) {
  return e(
    'h1',
    {id: 'wel'},
    'Hello, '+props.name
    );
}

const cre = React.createElement(
    'div',
    {name:'Mr.Greet'},
    Welcome({name:'Mr.G'})
  );
// e(LikeButton),
ReactDOM.render(
  e(LikeButton),
  document.getElementById('like_button_container')
);
// Person
class Person extends React.Component {
  render() {
      var h3Element = e("h3", null, 'Person ' + this.props.personNo);
      var ulElement = e("ul", null, [
          e("li", null, "First Name: " + this.props.firstName),
          e("li", null, "Last Name: " + this.props.lastName)
        ]
      );
      return e("div", {class: 'person-info'}, [h3Element, ulElement]);
    }
}
const element1 = document.getElementById('person1')
const element2 = document.getElementById('person2')
ReactDOM.render(
    e(Person, {personNo: 1, firstName:'Bill', lastName: 'Gates'}, null),element1
)
ReactDOM.render(
    e(Person, {personNo: 2, firstName:'Donald', lastName: 'Trump'}, null),element2
)
