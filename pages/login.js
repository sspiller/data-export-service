import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import AuthService from '../utils/AuthService';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tidepoolClient = null;
    this.state = {
      email: '',
      password: '',
      environment: 'prd',
      environments: [
        { text: 'Production', key: 'prd', value: 'prd' },
        { text: 'Integration', key: 'int', value: 'int' },
        { text: 'Development', key: 'dev', value: 'dev' },
        { text: 'localhost', key: 'local', value: 'local' },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    if (AuthService.loggedIn()) {
      this.props.url.replaceTo('/patients'); // redirect if you're already logged in
    }
  }


  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  async handleSubmit(e) {
    console.log(`AUTH? ${AuthService.loggedIn()}`);
    const { email, password, environment } = this.state;

    e.preventDefault();
    // yay uncontrolled forms!
    const response =
      await AuthService.login(email, password, environment);
    console.log(response);
  }

  render() {
    const { email, password, environment } = this.state;

    return (
      <div className="login-form">
        <Head>
          <title>Login - Tidepool data export service</title>
        </Head>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle" >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image src="/static/tidepool_logo.png" />
            <Header as="h2" color="blue" textAlign="center">
              Login to your account
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" name="email" value={email} onChange={this.handleChange} />
                <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" name="password" type="password" value={password} onChange={this.handleChange} />
                <Form.Select label="Environment" options={this.state.environments} placeholder="Environment" name="environment" value={environment} onChange={this.handleChange} />
                <Form.Checkbox label="Remember me" />

                <Message
                  error
                  header="Login Error"
                  content="Username and/or password are incorrect"
                />
                <Form.Button color="blue" fluid size="large" content="Login" />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
