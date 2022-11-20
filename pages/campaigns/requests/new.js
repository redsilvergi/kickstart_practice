import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes';
import { Form, Message, Button, Input } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';

class RequestNew extends Component {
    state = {
        LD: false,
        Err: '',
        description: '',
        value: '',
        recipient: ''
    }

    static getInitialProps(props) {
        return { address: props.query.address };
    }

    onSubmit = async e => {
        e.preventDefault();
        this.setState({ LD: true, Err: '' });

        try {
            const campaign = Campaign(this.props.address);

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                this.state.description,
                web3.utils.toWei(this.state.value, 'ether'),
                this.state.recipient
            ).send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`)
        } catch(err) {
            this.setState({ Err: err.message });
        }

        this.setState({ LD: false });
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a><Button basic floated='right'>Back</Button></a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.Err}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={e => this.setState({ description: e.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={e => this.setState({ value: e.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={e => this.setState({ recipient: e.target.value })}
                        />
                    </Form.Field>

                    {this.state.LD ? (<Message header='Progressing' content='wait for few seconds' />) : null}
                    <Message error header='Oops!' content={this.state.Err} />
                    <Button primary loading={this.state.LD}>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;