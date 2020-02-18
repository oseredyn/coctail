import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchResult from '../SearchResult/SearchResult';
import API from '../../helpers/API';
import {bindActionCreators} from "redux";
import {setSearchValue} from "../../actions/PageActions";
import {setSearchItems} from "../../actions/PageActions";
import {connect} from "react-redux";

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.props.setSearchValue(event.target.value);
    }
    handleSubmit(e) {
        e.preventDefault();
        API('search','s', this.props.value)
            .then(
                (result) => {
                    this.props.setSearchItems(result.drinks);
                }
            )

    }

    render() {
        const {items } = this.props;
        return (
            <div className="container">
                <form className="find-form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField label="Type keys" fullWidth value={this.props.searchField} onChange={this.handleChange} />
                    <Button className="find-btn" variant="contained" color="primary" size="large" onClick={this.handleSubmit}>
                        Apply
                    </Button>
                </form>
                <SearchResult items={items} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    value: state.search.value,
    items: state.search.items,
});
const mapDispatchToProps = (dispatch) => ({
    setSearchValue: bindActionCreators(setSearchValue, dispatch),
    setSearchItems: bindActionCreators(setSearchItems, dispatch)
});
Search.propTypes = {
    value: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);

