import { uiActions } from "./ui-slice";
/**
 * Sends the cart data to the server.
 * @param {Object} cart - The cart data to be sent.
 * @returns {Function} - A function that dispatches actions to update the UI state.
 */
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // Show a notification indicating that the cart data is being sent
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    /**
     * Sends a request to the server to update the cart data.
     * @throws {Error} - If sending cart data fails.
     */
    const sendRequest = async () => {
      const response = await fetch(
        "https://test-react-app-6e16f-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      // Show a success notification if cart data is sent successfully
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      // Show an error notification if sending cart data fails
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
