import React from 'react';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {bindActionCreators} from "redux";
import {cleanDetailedItem} from "../../actions/PageActions";
import {connect} from "react-redux";

class CoctailModal extends React.Component {
    getDateIngredients = () => {
        const { item: product } = this.props;
        if (product) {
            const keys = Object.keys(product);
            const ingredients = keys
                .filter((key, index) => {
                    return key.indexOf('strIngredient') >= 0;
                })
                .filter((key, index) => {
                    return product[`strIngredient${index+1}`];
                });

            const measure = keys
                .filter((key, index) => {
                    return key.indexOf('strMeasure') >= 0;
                })
                .filter((key, index) => {
                    return product[`strMeasure${index+1}`];
                });

            const structure = ingredients.map((item, index) => ({
                ingredients: product[item],
                measure: product[measure[index]] || null,
            }));
            return structure;
        }
    };

    renderList = () => {
        const data = this.getDateIngredients();
        if (data) {
            return <List component="nav">
                {
                    data.map((item,index) => {
                        return <ListItem key={index}>
                            <ListItemText primary={item.ingredients} secondary={item.measure} />
                        </ListItem>;
                    })
                }
            </List>
        }
    }

    render() {
        const { isModalOpen, product, handleOpenModal } = this.props;
        const handleClose = () => {
            handleOpenModal();
        };
        if(product){
            this.getDateIngredients();
            return (
                <div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={isModalOpen}
                        onClose={() => handleOpenModal()}
                    >
                        <div className="modal-content">
                            <IconButton aria-label="close" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <div className="scroller">
                                <h2 id="simple-modal-title">{product.strDrink}</h2>
                                <div className="container">
                                    <img src={product.strDrinkThumb} alt=""/>
                                    <div className="info">
                                        <dl>
                                            <dt>Category:</dt>
                                            <dd>{product.strCategory}</dd>
                                            <dt>Type:</dt>
                                            <dd>{product.strAlcoholic}</dd>
                                            <dt>Glass:</dt>
                                            <dd>{product.strGlass}</dd>
                                        </dl>
                                        <p id="simple-modal-description">
                                            {product.strInstructions}
                                        </p>
                                    </div>
                                </div>
                                <div className="ingredients-list">
                                    <h3>Ingredients:</h3>
                                    { this.renderList() }
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }else{
            return false;
        }
    }
}

const mapStateToProps = (state) => ({
    item: state.search.item,
});

const mapDispatchToProps = (dispatch) => ({
    cleanDetailedItem: bindActionCreators(cleanDetailedItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoctailModal);