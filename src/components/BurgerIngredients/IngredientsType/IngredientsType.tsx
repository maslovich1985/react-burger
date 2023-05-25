import React, {FC, Ref, useEffect, useRef} from 'react';
import styles from './IngredientsType.module.css'
import IngredientCard, {IngredientWithCount} from "./IngredientCard/IngredientCard";
import {ingredients} from "../../../services/redux/selectors/ingredientsListSelector";
import {useInView} from "react-intersection-observer";
import {useAppSelector} from "../../../services/redux/hooks";

interface OwnProps {
    type: string;
    onClick: (id: string) => void;
    setTab: (tab: string) => void;
}

const IngredientsType: FC<OwnProps> = ({type, setTab, onClick}) => {

    const data = useAppSelector<IngredientWithCount[]>(ingredients)
    const {ref: refBunView, inView: inViewBunView} = useInView({threshold: 0.5, rootMargin: '0px 0px -450px 0px',});
    const {ref: refMainView, inView: inViewMainView} = useInView({threshold: 0.2, rootMargin: '0px 0px -450px 0px',});
    const {ref: refSauceView, inView: inViewSauceView} = useInView({threshold: 0.5, rootMargin: '0px 0px -450px 0px',});
    const refBun = useRef<null | HTMLDivElement>(null);
    const refSauce = useRef<null | HTMLDivElement>(null);
    const refMain = useRef<null | HTMLDivElement>(null);
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
            refBun.current && refBun.current.scrollIntoView({behavior: "smooth"});
        }
        if (type === 'Начинки') {
            refMain.current && refMain.current.scrollIntoView({behavior: "smooth"});
        }
        if (type === 'Соусы') {
            refSauce.current && refSauce.current.scrollIntoView({behavior: "smooth"});
        }

    }, [type]);
    const dataObj: Record<string, string> = {
        main: 'Начинки',
        bun: 'Булки',
        sauce: 'Соусы',
    };
    const dataInViewRef: Record<string, Ref<HTMLDivElement>> = {
        main: refMainView,
        bun: refBunView,
        sauce: refSauceView,
    };
    const dataRef: Record<string, Ref<HTMLDivElement>> = {
        main: refMain,
        bun: refBun,
        sauce: refSauce,
    };
    const ingredientsTypes = ['bun', 'sauce', 'main'];
    const mediumTextStyle = 'text text_type_main-medium';
    return (
        <>
            {ingredientsTypes.map((products: string, i) => {
                    const productsKind = (data as IngredientWithCount[])?.filter((type) => type.type === products);
                    if (type === dataObj[products]) {
                        return (
                            <div ref={dataInViewRef[products]} key={`${products}-${i}`}>
                                <div ref={dataRef[products]} className={`${styles.wrapper} pt-10`}>
                                    <div className={mediumTextStyle}>
                                        {dataObj[products]}
                                    </div>
                                    <div className={styles.ingredients_cards_wrapper}>
                                        {productsKind.map((products: IngredientWithCount, i: number) => <IngredientCard
                                            onClick={onClick}
                                            products={products}
                                            key={`${products.type}-${i}`}
                                            index={i}/>)}
                                    </div>
                                </div>
                            </div>

                        )
                    }
                    return (
                        <div ref={dataInViewRef[products]} key={`${products}-${i}`}>
                            <div ref={dataRef[products]} className={`${styles.wrapper} mt-10`}>
                                <div className={mediumTextStyle}>
                                    {dataObj[products]}
                                </div>
                                <div className={styles.ingredients_cards_wrapper}>
                                    {productsKind.map((products: IngredientWithCount, i: number) => <IngredientCard
                                        onClick={onClick}
                                        products={products}
                                        key={`${products.type}-${i}`}
                                        index={i}/>)}
                                </div>
                            </div>
                        </div>
                    )
                }
            )}
        </>
    );
}

export default IngredientsType;