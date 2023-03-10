import { MainStackParams } from './../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { CardSetCompleteInfo } from "../types"
import { BACKEND_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import generateUUID from '../utils/generateUUID';

function useCardSetData(propCardsetId: undefined | string) {
    
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParams,"AddCardSet">>()

    const [cardsetData, setCardsetData] = useState<CardSetCompleteInfo>()
    const [index, setIndex] = useState<number>(0)
    const cardData = cardsetData?.questions[index]
    const isFocused = useIsFocused();

    // init cartsetData
    useEffect(() => {
        if(!isFocused) return

        const fetchCardSetData = async (cardset_id: string): Promise<void> => {
            // call api to get cardset data
            if (cardset_id === undefined) return

            const token = await AsyncStorage.getItem("@token")
            const res = await fetch(`${BACKEND_URL}/api/cardset/getcard/${cardset_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })

            if (res.status !== 200) {
                throw new Error("Failed to get cardset data")
                return
            }

            const json: CardSetCompleteInfo = await res.json()

            console.log("get cardset info successfully, data is");
            console.log(json);

            console.log("clear route info")

            setCardsetData(json)
        }

        const createNewCardSet = async (): Promise<void> => {
            const token = await AsyncStorage.getItem("@token")
            const res = await fetch(`${BACKEND_URL}/api/cardset/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    cardset_title: `new Card Set Title${generateUUID(4)}`
                })
            })
            

            
            if (res.status !== 200) {

                const errorMessage = await res.json()

                showMessage({
                    type: "danger",
                    message: "?????????????????????,???????????????"
                })
                navigation.goBack()

                console.warn("Create cardset Failed");
                console.warn(errorMessage);
                
            }

            const json: {
                cardset_id: string,
                cardset_title: string
                is_available: boolean
            } = await res.json();

            console.log(`create card set successfully, card_set id is ${json.cardset_id}`);

            addCardsetQuestionAndAnswer(json.cardset_id)
            fetchCardSetData(json.cardset_id)
        }

        if (propCardsetId === undefined) {
            console.log("cardid is undefined creating cardset");
            createNewCardSet()
            return
        }

        fetchCardSetData(propCardsetId)

    }, [isFocused])

    const handleNavigateIndex = async (navigateIndex: 1 | -1): Promise<void> => {
        if (index === 0 && navigateIndex === -1 || cardsetData === undefined) return

        if (index === (cardsetData?.questions.length as number) - 1 && navigateIndex === 1) await addCardsetQuestionAndAnswer(cardsetData?.id)

        const i = index
        setIndex(prev => prev + navigateIndex)

    }

    const updateCardsetTitleFrontendOnChange = (title: string) => {
        if (title.length === 0) return
        setCardsetData(prev => {
            if (!prev) return prev
            return {
                ...prev,
                name: title
            }
        })
    }

    const updateCardsetTitleBackendOnBlur = async (title: string) => {
        // call api to update cardset title
        if (!cardsetData || title.length === 0) return
        const token = await AsyncStorage.getItem("@token")
        const res = await fetch(`${BACKEND_URL}/api/cardset/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                cardset_id: cardsetData.id,
                cardset_title: title
            })
        })

        console.log("update cardset title");
        
        
        if (res.status !== 200) {
            const errorMessage = await res.json()
            console.warn(res.status);
            console.warn(errorMessage);
            showMessage({
                type: "danger",
                message: "???????????????????????????,???????????????"
            })
            return
        }

        console.log("update cardset title successfully");
        

    }

    const addCardsetQuestionAndAnswerFrontend = ({ newQuestionId, newQuestionName, newQuestionAnswer }: {
        newQuestionId: string,
        newQuestionName: string,
        newQuestionAnswer: string
    }) => {
        setCardsetData(prev => {
            if (!prev) return prev
            return {
                ...prev,
                questions: [
                    ...prev.questions,
                    {
                        id: newQuestionId,
                        question: newQuestionName,
                        answer: newQuestionAnswer
                    }
                ]
            }
        })
    }

    const addCardsetQuestionAndAnswerBackend = async (cardset_id: string): Promise<{
        newQuestionId: string,
        newQuestionName: string,
        newQuestionAnswer: string
    }> => {
        // call api to add question and answer
        // return new question id, question name, question answer
        const token = await AsyncStorage.getItem("@token")
        const res = await fetch(`${BACKEND_URL}/api/question/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                cardset_id: cardset_id,
                question_title: `new question${generateUUID(4)}`,
                answer: `new question answer${generateUUID(4)}`
            })
        })

        if (res.status !== 200) {
            showMessage({
                type: "warning",
                message: "Failed to add question,please refresh page",
            })
            return {
                newQuestionId: "",
                newQuestionName: "",
                newQuestionAnswer: ""
            }
        }

        const { question_id: newQuestionId, question_title: newQuestionName, answer: newQuestionAnswer } = await res.json()


        return { newQuestionId, newQuestionName, newQuestionAnswer }
    }

    const addCardsetQuestionAndAnswer = async (cardset_id: string): Promise<void> => {
        const { newQuestionId, newQuestionName, newQuestionAnswer } = await addCardsetQuestionAndAnswerBackend(cardset_id)
        addCardsetQuestionAndAnswerFrontend({ newQuestionId, newQuestionName, newQuestionAnswer })
    }

    const deleteCardsetQuestionAndAnswerFrontend = (questionId: string) => {
        setCardsetData(prev => {
            if (!prev) return prev
            return {
                ...prev,
                questions: prev.questions.filter(q => q.id !== questionId)
            }
        })
    }

    const deleteCardsetQuestionAndAnswerBackend = async (questionId: string): Promise<void> => {
        const token = await AsyncStorage.getItem("@token")
        const res = await fetch(`${BACKEND_URL}/api/question/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                question_id: questionId
            })
        })

        if (res.status !== 200) {
            showMessage({
                type: "danger",
                message: "????????????????????????????????????"
            })
            return
        }

    }

    const deleteCardsetQuestionAndAnswer = async () => {
        if (!cardsetData || !cardData?.id || cardsetData?.questions.length === 1) return
        const questionId = cardData.id
        await deleteCardsetQuestionAndAnswerBackend(questionId)
        deleteCardsetQuestionAndAnswerFrontend(questionId)
        if (index === cardsetData?.questions.length - 1) setIndex(prev => prev - 1)
    }

    const updateCardsetQuestionAndAnswerFrontendOnChange = (question: string | undefined, answer: string | undefined) => {
        if (!cardData?.id || !question || !answer) return
        const questionId = cardData.id
        setCardsetData(prev => {
            if (!prev) return prev
            return {
                ...prev,
                questions: prev.questions.map(q => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            question,
                            answer
                        }
                    }
                    return q
                })
            }
        })
    }

    const updateCardsetQuestionAndAnswerBackendOnBlur = async (question: string | undefined, answer: string | undefined): Promise<void> => {
        if (cardsetData?.id === undefined ||cardData?.id === undefined || !question || !answer) return
        // call api to update question and answer
        const token = await AsyncStorage.getItem("@token")
        const res = await fetch(`${BACKEND_URL}/api/question/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                question_id: cardData.id,
                question_title: question,
                answer,
                cardset_id: cardsetData.id
            })
        })

        if (res.status !== 200) {
            showMessage({
                type: "warning",
                message: "Failed to update question,please refresh page",
                description: res.statusText
            })
            return
        }

        console.log("update question and answer successfully");

    }

    return {
        cardsetData,
        cardData,
        updateCardsetTitleFrontendOnChange,
        updateCardsetTitleBackendOnBlur,
        addCardsetQuestionAndAnswer,
        deleteCardsetQuestionAndAnswer,
        handleNavigateIndex,
        updateCardsetQuestionAndAnswerFrontendOnChange,
        updateCardsetQuestionAndAnswerBackendOnBlur
    }
}

export default useCardSetData;