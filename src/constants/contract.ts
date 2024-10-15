export const CONTRACT_ADDRESS =
  '0xe56bfd96c130be460bc962aca4c27e8e57e889a358ae713d86439ca531eabdb5';

export const ORACLE_ADDRESS = '0xd37904ac357ea266e2c30cae3b6559f9d1222909f9b5781b0eaf1e1acd952e96';

export const CONTRACT_FUNCTIONS: Record<string, `${string}::${string}::${string}`> = {
  DA_CREATE_COLLECTION: `${CONTRACT_ADDRESS}::digital_asset::create_collection`,
  DA_MINT_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::mint_token`,
  DA_DELETE_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::delete_token`,
  DA_TRANSFER_DEBT_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::transfer_debt_token`,
  DA_TRANSFER_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::transfer_token`,
  DA_WITHDRAW_DEBT_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::withdraw_debt_token`,
  DA_WITHDRAW_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::withdraw_token`,
  EA_ADD_NFT_TO_AUCTION: `${CONTRACT_ADDRESS}::english_auction::add_nft_to_auction`,
  EA_DECLARE_WINNER: `${CONTRACT_ADDRESS}::english_auction::declare_winner`,
  EA_INITIALIZE_WITH_BID: `${CONTRACT_ADDRESS}::english_auction::initialize_with_bid`,
  EA_PLACE_BID: `${CONTRACT_ADDRESS}::english_auction::place_bid`,
  EX_ADD_OFFER: `${CONTRACT_ADDRESS}::exchange::add_offer`,
  EX_BUY_WITH_DOWN_PAYMENT: `${CONTRACT_ADDRESS}::exchange::buy_with_down_payment`,
  EX_BUY_WITH_FULL_PAYMENT: `${CONTRACT_ADDRESS}::exchange::buy_with_full_payment`,
  EX_CANCEL_LIST_OFFER_NFT: `${CONTRACT_ADDRESS}::exchange::cancel_list_offer_nft`,
  EX_LIST_INSTANTLY_NFT: `${CONTRACT_ADDRESS}::exchange::list_instantly_nft`,
  EX_LIST_OFFER_NFT: `${CONTRACT_ADDRESS}::exchange::list_offer_nft`,
  EX_REMOVE_OFFER: `${CONTRACT_ADDRESS}::exchange::remove_offer`,
  EX_SELL_WITH_OFFER_NFT: `${CONTRACT_ADDRESS}::exchange::sell_with_offer_nft`,
  FAM_BURN: `${CONTRACT_ADDRESS}::fungible_asset_minter::burn`,
  FAM_CREATE_FA: `${CONTRACT_ADDRESS}::fungible_asset_minter::create_fa`,
  FAM_MINT: `${CONTRACT_ADDRESS}::fungible_asset_minter::mint`,
  FAM_TRANSFER: `${CONTRACT_ADDRESS}::fungible_asset_minter::transfer`,
  LP_BORROW: `${CONTRACT_ADDRESS}::lending_pool::borrow`,
  LP_CREATE_RESERVE: `${CONTRACT_ADDRESS}::lending_pool::create_reserve`,
  LP_DEPOSIT: `${CONTRACT_ADDRESS}::lending_pool::deposit`,
  LP_DEPOSIT_COLLATERAL: `${CONTRACT_ADDRESS}::lending_pool::deposit_collateral`,
  LP_REPAY: `${CONTRACT_ADDRESS}::lending_pool::repay`,
  LP_WITHDRAW: `${CONTRACT_ADDRESS}::lending_pool::withdraw`,
  MFL_DEPOSIT: `${CONTRACT_ADDRESS}::mock_flash_loan::deposit`,
};

export const MEGA_COIN: Record<string, `${string}::${string}::${string}`> = {
  MC_MINT: `${CONTRACT_ADDRESS}::mega_coin::mint`,
  MC_REGISTER: `${CONTRACT_ADDRESS}::mega_coin::register`,
  MC_TRANSFER: `${CONTRACT_ADDRESS}::mega_coin::transfer`,
  MC_WITHDRAW: `${CONTRACT_ADDRESS}::mega_coin::withdraw`,
  MC_COIN_TYPE: `${CONTRACT_ADDRESS}::mega_coin::MockAPT`,
};

export const MEGA_COIN_DECIMALS = 6;

export const CONTRACT_VIEWS: Record<string, `${string}::${string}::${string}`> = {
  DA_GET_ADDRESS_DEBT_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::get_address_debt_token`,
  DA_GET_ADDRESS_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::get_address_token`,
  DA_GET_OWNER_DEBT_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::get_owner_debt_token`,
  DA_GET_OWNER_TOKEN: `${CONTRACT_ADDRESS}::digital_asset::get_owner_token`,
  DA_GET_TOKEN_DATA: `${CONTRACT_ADDRESS}::digital_asset::get_token_data`,
  EA_GET_CHECK_IF_FIRST_BID: `${CONTRACT_ADDRESS}::english_auction::check_if_first_bid`,
  EA_GET_BID_INFORMATION: `${CONTRACT_ADDRESS}::english_auction::get_bid_information`,
  EA_GET_MINIMUM_BID: `${CONTRACT_ADDRESS}::english_auction::get_minimum_bid`,
  EA_GET_NFT_TO_AUCTION: `${CONTRACT_ADDRESS}::english_auction::get_nft_to_auction`,
  EA_GET_NUMBER_NFT_TO_AUCTION: `${CONTRACT_ADDRESS}::english_auction::get_numbers_nft_to_auction`,
  EX_GET_INSTANTLY_NFT: `${CONTRACT_ADDRESS}::exchange::get_instantly_nft`,
  EX_GET_NFT_PRICE: `${CONTRACT_ADDRESS}::exchange::get_nft_price`,
  EX_GET_NUMBER_OFFERS: `${CONTRACT_ADDRESS}::exchange::get_number_offers`,
  EX_GET_NUMBERS_INSTANTLY_NFT: `${CONTRACT_ADDRESS}::exchange::get_numbers_instantly_nft`,
  EX_GET_NUMBERS_OFFER_NFT: `${CONTRACT_ADDRESS}::exchange::get_numbers_offer_nft`,
  EX_GET_OFFER: `${CONTRACT_ADDRESS}::exchange::get_offer`,
  EX_GET_OFFER_NFT: `${CONTRACT_ADDRESS}::exchange::get_offer_nft`,
  LP_GET_ALL_USER_DEPOSIT: `${CONTRACT_ADDRESS}::lending_pool::get_all_user_deposit`,
  LP_GET_BORROWER_INFORMATION: `${CONTRACT_ADDRESS}::lending_pool::get_borrower_information`,
  LP_GET_COLLATERAL: `${CONTRACT_ADDRESS}::lending_pool::get_collateral`,
  LP_GET_COLLATERAL_NUMBERS: `${CONTRACT_ADDRESS}::lending_pool::get_collateral_numbers`,
  LP_GET_LENDER_INFORMATION: `${CONTRACT_ADDRESS}::lending_pool::get_lender_information`,
  LP_GET_MARKET_CONFIGURATION: `${CONTRACT_ADDRESS}::lending_pool::get_market_configuration`,
  FAM_GET_BALANCE: `${CONTRACT_ADDRESS}::fungible_asset_minter::get_balance`,
};

export const ORACLE_FUNCTIONS: Record<string, `${string}::${string}::${string}`> = {
  ORACLE_GET_FLOOR_PRICE: `${ORACLE_ADDRESS}::oracle::get_floor_price`,
  ORACLE_GET_FULL_PAYMENT_PRICE: `${ORACLE_ADDRESS}::oracle::get_full_payment_price`,
  ORACLE_GET_DOWN_PAYMENT_PRICE: `${ORACLE_ADDRESS}::oracle::get_down_payment_price`,
};
