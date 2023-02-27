import React, {useEffect, useRef} from 'react';
import styles from './IngredientsType.module.css'
import IngredientCard from "./IngredientCard/IngredientCard";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {ingredients} from "../../../services/redux/selectors/ingredientsListSelector";
import {useInView} from "react-intersection-observer";

function IngredientsType({type, setTab, onClick}) {

    const data = useSelector(ingredients)
    const { ref: refBunView, inView: inViewBunView } = useInView({ threshold: 0.5, rootMargin: '0px 0px -450px 0px', });
    const { ref: refMainView, inView: inViewMainView } = useInView({ threshold: 0.2, rootMargin: '0px 0px -450px 0px', });
    const { ref: refSauceView, inView: inViewSauceView } = useInView({ threshold: 0.5, rootMargin: '0px 0px -450px 0px', });
    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);
    useEffect(() => {
        if (inViewBunView) {
            setTab('Булки')
        }
        if (inViewMainView) {
            setTab('Начинки')
        }
        if (inViewSauceView) {
            setTab('Соусы')
        }
    }, [inViewBunView, inViewMainView, inViewSauceView, setTab]);

    useEffect(() => {
        if (type === 'Булки') {
            refBun.current.scrollIntoView({behavior: "smooth"});
        }
        if (type === 'Начинки') {
            refMain.current.scrollIntoView({behavior: "smooth"});
        }
        if (type === 'Соусы') {
            refSauce.current.scrollIntoView({behavior: "smooth"});
        }

    }, [type]);
    const dataObj = {
        main: 'Начинки',
        bun: 'Булки',
        sauce: 'Соусы',
    };
    const dataInViewRef = {
        main: refMainView,
        bun: refBunView,
        sauce: refSauceView,
    };
    const dataRef = {
        main: refMain,
        bun: refBun,
        sauce: refSauce,
    };
    const ingredientsTypes = ['bun', 'sauce', 'main'];
    const mediumTextStyle = 'text text_type_main-medium';
    return (
        <>
            {ingredientsTypes.map((products, i) => {
                const productsKind = data?.filter((type) => type.type === products);
                if (type === dataObj[products]) {
                       return (
                           <div ref={dataInViewRef[products]} key={`${products.type}-${i}`}>
                               <div ref={dataRef[products]} className={`${styles.wrapper} pt-10`}>
                                   <div className={mediumTextStyle}>
                                       {dataObj[products]}
                                   </div>
                                   <div className={styles.ingredients_cards_wrapper}>
                                       { productsKind.map((products, i) => <IngredientCard onClick={onClick} products={products} key={`${products.type}-${i}`} index={i}/>)}
                                   </div>
                               </div>
                           </div>

                       )}
                return (
                    <div ref={dataInViewRef[products]} key={`${products.type}-${i}`}>
                        <div ref={dataRef[products]} className={`${styles.wrapper} mt-10`}>
                            <div className={mediumTextStyle}>
                                {dataObj[products]}
                            </div>
                            <div className={styles.ingredients_cards_wrapper}>
                                {productsKind.map((products, i) => <IngredientCard onClick={onClick} products={products} key={`${products.type}-${i}`} index={i}/>)}
                            </div>
                        </div>
                    </div>
                )}
            )}
        </>
    );
}

IngredientsType.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired,
}

export default IngredientsType;