import { reactive } from "vue"

type NotifyType = 'success' | 'error'

const state = reactive({show: false, message: '', type: 'success' as NotifyType})

export function useNotify() {
    const show = (message: string, type: NotifyType) => {
        state.message = message,
        state.type = type,
        state.show = true
    }

    return {
        state,
        success: (message: string) => show(message, 'success'),
        error: (message: string) => show(message, 'error')
    }
}