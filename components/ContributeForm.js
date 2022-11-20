import { Router } from '../routes';
import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
    state = {
        value: '',
        LD: false,
        errM: ''
    }

    onSubmit = async e => {
        e.preventDefault();
        this.setState({ LD: true, errM: '' });

        const campaign = Campaign(this.props.address);

        try {
            const accounts = web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch(err) {
            this.setState({ errM: err.message })
        }

        this.setState({ LD: false, value: '' });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errM}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        value={this.state.value}
                        onChange={e => this.setState({ value: e.target.value })}
                        label='ether'
                        labelPosition='right'
                    />
                </Form.Field>

                {this.state.LD ? (<Message header='Progressing' content='Do not worry' />) : null }
                <Message error header='Oops!' content={this.state.errM} />
                <Button primary loading={this.state.LD}>Contribute!</Button>
            </Form>
        )
    }
}

export default ContributeForm;