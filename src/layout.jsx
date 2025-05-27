import { Component } from 'react';
import { Container } from 'reactstrap';
import 'semantic-ui-css/semantic.min.css';
import { NavMenu } from './components/navmenu/NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                <Container tag="main">

                </Container>
            </div>
        );
    }
}
