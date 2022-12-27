import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { CardSetCompleteInfo } from "../types"
import generateUUID from '../utils/generateUUID';
import { BACKEND_URL } from '@env'

function useCardSetData(cardsetId: string) {
    const [cardsetData, setCardsetData] = useState<CardSetCompleteInfo>()
    const [index, setIndex] = useState<number>(0)
    const cardData = cardsetData?.questions[index]

    // init cartsetData
    useEffect(() => {

        // call api to get cardset data
        const data: CardSetCompleteInfo = {
            id: "123sda",
            name: "test",
            questions: [
                {
                    id: "123",
                    question: "q11",
                    answer: "q44"
                },
                {
                    id: "123123",
                    question: "q22",
                    answer: "q44"
                },
                {
                    id: "123123123",
                    question: "q33",
                    answer: "q44"
                },
            ]
        }

        setCardsetData(data)

    }, [])

    const handleNavigateIndex = async (navigateIndex: 1 | -1): Promise<void> => {
        if (index === 0 && navigateIndex === -1) return

        if (index === (cardsetData?.questions.length as number) - 1 && navigateIndex === 1) await addCardsetQuestionAndAnswer()

        const i = index
        setIndex(prev => prev + navigateIndex)

    }

    const updateCardsetTitleFrontendOnChange = (title: string) => {
        if(title.length === 0) return
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
        if (!cardData?.id || title.length === 0) return
        const questionId = cardData.id
        console.log("updateCardsetTitleBackendOnBlur", title);
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

    const addCardsetQuestionAndAnswerBackend = async (): Promise<{
        newQuestionId: string,
        newQuestionName: string,
        newQuestionAnswer: string
    }> => {
        // call api to add question and answer
        // return new question id, question name, question answer
        const newQuestionId = generateUUID(10)
        const newQuestionName = generateUUID(4)
        const newQuestionAnswer = generateUUID(4)
        return { newQuestionId, newQuestionName, newQuestionAnswer }
    }

    const addCardsetQuestionAndAnswer = async (): Promise<void> => {
        const { newQuestionId, newQuestionName, newQuestionAnswer } = await addCardsetQuestionAndAnswerBackend()
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
        // call api to delete question and answer
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
        if (!cardData?.id || !question || !answer) return
        const questionId = cardData.id
        console.log("updateCardsetQuestionAndAnswerBackendOnBlur", questionId, question, answer);
        // call api to update question and answer
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