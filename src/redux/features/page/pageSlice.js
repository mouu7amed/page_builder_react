import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../../../api";

const initialState = {
  loading: false,
  pages: [],
  error: "",
  createPageLoading: false,
  createPageError: "",
};

export const fetchPages = createAsyncThunk("pages/fetch", async () => {
  const response = await axios.get(`${API_HOST}pages/`);
  const data = await response.data;
  return data;
});

export const createPage = createAsyncThunk("page/create", async (pageInfo) => {
  const response = await axios.post(`${API_HOST}pages/`, pageInfo);
  const data = await response.data;
  return data;
});

export const deletePage = createAsyncThunk("page/delete", async (pageId) => {
  const response = await axios.delete(`${API_HOST}pages/${pageId}`);
  const data = await response.data;
  return data;
});

export const pushViewPage = createAsyncThunk(
  "page/pushview",
  async (viewInfo) => {
    const response = await axios.post(
      `${API_HOST}pages/${viewInfo[0]}/view`,
      viewInfo[1]
    );
    const data = await response.data;
    return data;
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState,
  extraReducers: (builder) => {
    //GET
    builder.addCase(fetchPages.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPages.fulfilled, (state, action) => {
      state.loading = false;
      state.pages = action.payload;
      state.error = "";
    });

    builder.addCase(fetchPages.rejected, (state, action) => {
      state.loading = false;
      state.pages = [];
      state.error = action.payload;
    });

    //POST
    builder.addCase(createPage.pending, (state) => {
      state.createPageLoading = true;
    });

    builder.addCase(createPage.fulfilled, (state, action) => {
      state.createPageLoading = false;
      state.pages.push(action.payload);
      state.createPageError = "";
    });

    builder.addCase(createPage.rejected, (state, action) => {
      state.createPageLoading = false;
      state.createPageError = action.payload;
    });
  },
});

export default pageSlice.reducer;
