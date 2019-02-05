import React from "react";
import { ListView } from "react-native";
import ListLands from "@presentational/ListLands";
import LandRow from "@presentational/LandRow";
import { Action } from "tasit-sdk";
import { abi as estateABI } from "../abi/EstateRegistry.json";
import { abi as markplaceABI } from "../abi/Marketplace.json";
const { Contract } = Action;

const estateAddress = "0x41b598a2c618b59b74540ac3afffb32f7971b37a";
const marketplaceAddress = "0x07c0e972064e5c05f7b3596d81de1afd35457eae";

const rowHasChanged = (r1, r2) => r1.id !== r2.id;
const ds = new ListView.DataSource({ rowHasChanged });

export default class ListLandsScreen extends React.Component {
  constructor() {
    super();
    const rows = [];
    const dataSource = ds.cloneWithRows(rows);
    this.state = {
      dataSource,
    };
  }

  async componentDidMount() {
    const rows = await this.getSellOrders();
    const dataSource = ds.cloneWithRows(rows);
    this.setState({ dataSource });
  }

  async getSellOrders() {
    const orders = [];
    const estateContract = new Contract(estateAddress, estateABI);
    const totalSupply = await estateContract.totalSupply();

    for (let estateId = 1; estateId <= totalSupply.toNumber(); estateId++)
      orders.push(this.getSellOrder(estateId));

    return await Promise.all(orders);
  }

  async getSellOrder(estateId) {
    const estateContract = new Contract(estateAddress, estateABI);
    const marketplaceContract = new Contract(marketplaceAddress, markplaceABI);

    const estateName = await estateContract.getMetadata(estateId);
    const [
      orderId,
      seller,
      price,
      expiresAt,
    ] = await marketplaceContract.auctionByAssetId(estateId);

    const priceMana = Number(price.toString()) / 1e18;
    const priceUsd = priceMana * 30;

    return {
      id: estateId,
      name: estateName,
      priceMana,
      priceUsd,
      img: `https://api.decentraland.org/v1/estates/${estateId}/map.png`,
      orderId,
      seller,
      expiresAt,
    };
  }

  renderRow = land => {
    const handlePress = () =>
      this.props.navigation.navigate("LandClaimScreen", { land: land });
    return <LandRow land={land} onPress={handlePress} />;
  };

  render() {
    return (
      <ListLands
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
