import { create } from 'zustand'

export const useCounterStore = create(
  (set) => ({
    // Estado incial
    count: 97,
    // Acciones
    increment: () => {
      console.log('incrementando...')
      set(state => {
        return {
          count: state.count + 1
        }
      })
    },
    decrement: () => {
      set(state => ({ count: state.count - 1 }))
    }
  })
)