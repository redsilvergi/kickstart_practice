import React, { Component, createFactory } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Button, Card } from 'semantic-ui-react';
import { Link } from '../routes';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
    };

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h1>Deployed Campaigns Address</h1>

                <Link route='/campaigns/new'>
                    <a>
                        <Button
                            floated='right'
                            content='Create Campaign'
                            icon='add circle'
                            primary
                        />
                    </a>
                </Link>

                {this.renderCampaigns()}
            </Layout>
        )
    }
}

export default CampaignIndex;