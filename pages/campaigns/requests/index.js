import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../../components/Layout';
import { Table, Button, Message } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        )

        return { address: props.query.address, requestsCount, approversCount, requests }
    }

    renderRows() {
        return (
            this.props.requests.map((request, index) => {
                return (
                    <RequestRow 
                        key={index}
                        id={index}
                        request={request}
                        address={this.props.address}
                        approversCount={this.props.approversCount}
                    />
                )
            })
        )
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}`}>
                    <a><Button basic floated='right'>Back</Button></a>
                </Link>

                <h3>Request List</h3>

                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a><Button primary floated='right' style={{ marginBottom: 20, marginTop: 0 }}>Add Request</Button></a>
                </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Votes</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>

                <Message content={`In total ${this.props.requetsCount} request(s) found`} />
            </Layout>    
        )
    }
}

export default RequestIndex;