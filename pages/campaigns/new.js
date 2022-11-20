import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../components/Layout';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { Router } from '../../routes';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errM: '',
        LD: false
    }

    onSubmit = async e => {
        e.preventDefault();

        this.setState({ LD: true, errM: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            })

            Router.pushRoute('/')
        } catch(err) {
            this.setState({ errM: err.message })
        }

        this.setState({ LD: false });
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errM}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label='wei'
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={e => 
                                this.setState({ minimumContribution: e.target.value })}    
                        />
                    </Form.Field>
                
                    <Message error header='Oops!' content={this.state.errM} />
                    <Button loading={this.state.LD} primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;