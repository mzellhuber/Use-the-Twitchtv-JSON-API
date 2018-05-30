var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var MyApp = function (_React$Component) {
	_inherits(MyApp, _React$Component);

	function MyApp(props) {
		_classCallCheck(this, MyApp);

		var _this = _possibleConstructorReturn(this, (MyApp.__proto__ || Object.getPrototypeOf(MyApp)).call(this, props));

		_this.state = {
			data: []
		};
		return _this;
	}

	_createClass(MyApp, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var results = [];

			var _loop = function _loop() {
				var chan = channels[i];
				fetch("https://wind-bow.glitch.me/twitch-api/streams/" + channels[i]).then(function (response) {
					return response.json();
				}).then(function (data) {
					results.push({ stream: data.stream, links: data._links, channel: chan });
					_this2.setState({ data: results, dataAll: results });
					console.log(results);
				});
			};

			for (var i in channels) {
				_loop();
			}
		}
	}, {
		key: "getAll",
		value: function getAll() {
			this.setState({ data: this.state.dataAll });
		}
	}, {
		key: "getOnline",
		value: function getOnline() {
			var streams = this.state.dataAll;
			streams = streams.filter(function (my_stream) {
				return my_stream.stream != null;
			});
			this.setState({ data: streams });
		}
	}, {
		key: "getOffline",
		value: function getOffline() {
			var streams = this.state.dataAll;
			streams = streams.filter(function (my_stream) {
				return my_stream.stream == null;
			});
			this.setState({ data: streams });
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "" },
				React.createElement(
					"h1",
					null,
					"Twitch Streamers"
				),
				React.createElement(
					"button",
					{ className: "btn btn-default", onClick: this.getAll.bind(this) },
					"All"
				),
				React.createElement(
					"button",
					{ className: "btn btn-success", onClick: this.getOnline.bind(this) },
					"Online"
				),
				React.createElement(
					"button",
					{ className: "btn btn-danger", onClick: this.getOffline.bind(this) },
					"Offline"
				),
				this.state.data.map(function (object, i) {
					return React.createElement(Stream, { obj: object, hasStream: object.stream != null });
				})
			);
		}
	}]);

	return MyApp;
}(React.Component);

var Stream = function (_React$Component2) {
	_inherits(Stream, _React$Component2);

	function Stream() {
		_classCallCheck(this, Stream);

		return _possibleConstructorReturn(this, (Stream.__proto__ || Object.getPrototypeOf(Stream)).apply(this, arguments));
	}

	_createClass(Stream, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "card" },
				React.createElement(
					"div",
					{ className: "card-header card-header-primary " + (this.props.hasStream ? "" : "red-card") },
					React.createElement(
						"h3",
						{ className: "card-title" },
						this.props.obj.channel,
						" stream status: ",
						this.props.hasStream ? 'online' : 'offline'
					)
				),
				React.createElement(
					"div",
					{ className: "card-body" },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-12" },
							React.createElement(
								"a",
								{ href: "https://www.twitch.tv/" + this.props.obj.channel, target: "_blank" },
								React.createElement(
									"h4",
									{ className: "card-title" },
									"Go to channel"
								)
							),
							this.props.hasStream ? React.createElement(StreamStatus, { obj: this.props.obj }) : ''
						)
					)
				)
			);
		}
	}]);

	return Stream;
}(React.Component);

var StreamStatus = function (_React$Component3) {
	_inherits(StreamStatus, _React$Component3);

	function StreamStatus() {
		_classCallCheck(this, StreamStatus);

		return _possibleConstructorReturn(this, (StreamStatus.__proto__ || Object.getPrototypeOf(StreamStatus)).apply(this, arguments));
	}

	_createClass(StreamStatus, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"p",
					null,
					this.props.obj.stream.game,
					" ",
					this.props.obj.stream.channel.status
				)
			);
		}
	}]);

	return StreamStatus;
}(React.Component);
// ========================================

ReactDOM.render(React.createElement(MyApp, null), document.getElementById('container'));