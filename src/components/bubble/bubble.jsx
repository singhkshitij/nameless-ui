import React, { Component } from "react";
import "./bubble.css";

export default class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="discussion">
        <div class="bubble sender first">Hello</div>
        <div class="bubble sender last">
          This is a CSS demo of the Messenger chat bubbles, that merge when
          stacked together.
        </div>

        <div class="bubble recipient first">Oh that's cool!</div>
        <div class="bubble recipient last">
          Did you use JavaScript to perform that kind of effect?
        </div>

        <div class="bubble sender first">No, that's full CSS3!</div>
        <div class="bubble sender middle">
          (Take a look to the 'JS' section of this Pen... it's empty! 😃
        </div>
        <div class="bubble sender last">And it's also really lightweight!</div>

        <div class="bubble recipient">Dope!</div>

        <div class="bubble sender first">
          Yeah, but I still didn't succeed to get rid of these stupid .first and
          .last classes.
        </div>
        <div class="bubble sender middle">
          The only solution I see is using JS, or a &lt;div&gt; to group
          elements together, but I don't want to ...
        </div>
        <div class="bubble sender last">
          I think it's more transparent and easier to group .bubble elements in
          the same parent.
        </div>

        <div class="bubble sender last">And it's also really lightweight!</div>

        <div class="bubble recipient">Dope!</div>

        <div class="bubble sender first">
          Yeah, but I still didn't succeed to get rid of these stupid .first and
          .last classes.
        </div>
        <div class="bubble sender middle">
          The only solution I see is using JS, or a &lt;div&gt; to group
          elements together, but I don't want to ...
        </div>
        <div class="bubble sender last">
          I think it's more transparent and easier to group .bubble elements in
          the same parent.
        </div>
      </div>
    );
  }
}
