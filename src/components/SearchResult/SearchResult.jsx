import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CoctailModal from "../CoctailModal/CoctailModal";
import API from "../../helpers/API";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { setDetailedItem, cleanDetailedItem } from "../../actions/PageActions";
class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isModalOpen: false,
            item: {},
        };
    }

    handleOpenModal = (item = null, isModalOpen = false) => {
        this.setState({
            item,
            isModalOpen,
        });
        if(!isModalOpen){
            this.props.cleanDetailedItem();
        }
    }

    handleSubmit = (key) => () => {
        API('lookup','i', key).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                });
                this.props.setDetailedItem(result.drinks[0]);
                this.handleOpenModal(this.props.item, true);
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    renderModal = () => {
        const { item } = this.props;
        const { isModalOpen } = this.state;
        if (!item) {
            return null;
        }
        return <CoctailModal
            handleOpenModal={this.handleOpenModal}
            cleanDetailedItem={cleanDetailedItem}
            isModalOpen={isModalOpen}
            product={item}
        />;
    }

    render() {
        const { items } = this.props;
        if(items){
            return (
                <div className="result">
                    {
                        <List component="nav">
                            {items.map(item => (
                                <ListItem button key={item.idDrink} onClick={this.handleSubmit(item.idDrink)}>
                                    <ListItemText primary={item.strDrink} />
                                </ListItem>
                            ))}

                        </List>
                    }
                    {this.renderModal()}
                </div>

            );
        }else{
            return(
                <p>По Вашему запросу ничего не найдено</p>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    item: state.search.item,
});

const mapDispatchToProps = (dispatch) => ({
    setDetailedItem: bindActionCreators(setDetailedItem, dispatch),
    cleanDetailedItem: bindActionCreators(cleanDetailedItem, dispatch),
});
SearchResult.propTypes = {
    item: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);