import { Component } from 'react';

export class StoreTable extends Component {

    static displayName = StoreTable.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
        //this.addStores = this.addCustomer.bind(this);
    }

    componentDidMount() {
        this.populateStoresData();
    }

    static renderStoresTable(stores) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td><button>Update Store</button></td>
                            <td><button>Delete Store</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StoreTable.renderStoresTable(this.state.stores);

        return (
            <div>
                <button onClick={this.addStores}>Add Stores</button>
                <h1 id="tableLabel">Stores</h1>
                {contents}
            </div>
        );
    }

    async addStores() {
        try {
            const response = await fetch('stores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 0,
                    name: 'UK, London'
                })
            });

            const text = await response.text(); // Log raw response text
            console.log(text);

            // Handle response if necessary
            if (text) {
                try {
                    const data = JSON.parse(text);
                    // Do something with the response data if needed
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }

            this.populateStoresData(); // Refresh the stores data
        } catch (error) {
            console.error("Error adding stores:", error);
        }
    }

    async populateStoresData() {
        try {
            const response = await fetch('stores');
            const text = await response.text(); // Log raw response text
            console.log(text);

            if (text) {
                try {
                    const data = JSON.parse(text);
                    this.setState({ stores: data, loading: false });
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    this.setState({ stores: [], loading: false });
                }
            } else {
                console.error("No data returned from API");
                this.setState({ stores: [], loading: false });
            }
        } catch (error) {
            console.error("Error fetching stores data:", error);
            this.setState({ stores: [], loading: false });
        }
    }
}
