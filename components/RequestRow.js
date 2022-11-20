import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react'
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
    state = {
        approveErr: '',
        approveLoading: false,
        finalizeErr: '',
        finalizeLoading: false,
    }

    onApprove = async () => {
        this.setState({ approveLoading: true, approveErr: '' });

        try {
            const campaign = Campaign(this.props.address);

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });

            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {
            this.setState({ approveErr: err.message })
        }

        this.setState({ approveLoading: false });
    }

    onFinalize = async () => {
        this.setState({ finalizeLoading: true, finalizeErr: '' })

        try {
            const campaign = Campaign(this.props.address);

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });

            Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        } catch(err) {
            this.setState({ finalizeErr: err.message });
        }

        this.setState({ finalizeLoading: false });
    }

    render() {        
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.noVotesApproved > approversCount/2;

        return (
            <Row disabled={request.complete} positive={!request.complete && readyToFinalize} >
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.noVotesApproved}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? (null) : (!!this.state.approveErr ? (
                        <Button color='red' basic onClick={this.onApprove} loading={this.state.approveLoading}>
                            <Icon name='attention' />
                            Retry
                        </Button>
                    ) : (
                        <Button color='green' basic onClick={this.onApprove} loading={this.state.approveLoading}>
                            Approve
                        </Button>
                    ))}
                </Cell>
                <Cell>
                    {request.complete ? (<h5>COMPLETE</h5>) : (!!this.state.finalizeErr ? (
                        <Button color='red' basic onClick={this.onFinalize} loading={this.state.finalizeLoading}>
                            <Icon name='attention' />
                            Retry
                        </Button>
                    ) : (
                        <Button color='purple' basic onClick={this.onFinalize} loading={this.state.finalizeLoading}>
                            Finalize
                        </Button>
                    ))}
                </Cell>
            </Row>
        )
    }
}

export default RequestRow;