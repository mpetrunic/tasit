import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { ListLandForSaleScreen } from "./ListLandForSaleScreen";

describe("ListLandForSaleScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const assetsForSale = { list: [], loadingInProgress: true };
    const addLandForSaleToList = () => {};
    const selectLandToBuy = () => {};
    const setLoadingAssetsForSaleInProgress = () => {};
    expect(
      shallow(
        <ListLandForSaleScreen
          assetsForSale={assetsForSale}
          addLandForSaleToList={addLandForSaleToList}
          selectLandToBuy={selectLandToBuy}
          setLoadingAssetsForSaleInProgress={setLoadingAssetsForSaleInProgress}
        />
      )
    ).toMatchSnapshot();
  });
});
