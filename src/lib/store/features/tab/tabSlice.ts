import { createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface tabSlices {
  activeTab: string
}

const initialState: tabSlices = {
  activeTab: 'Home',
}

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.activeTab = action.payload
    },
  },
})

export const { setTab } = tabSlice.actions

export default tabSlice.reducer