#![no_std]
use gstd::{async_main, collections::HashMap, msg, prelude::*, ActorId};
use io::*;

// use serde::{Serialize, Deserialize};
// use serde_json::json;

// 1. Create the main state as a static variable.
static mut STATE: Option<CertificateHandlerState> = None;

// Create a public State
#[derive(Clone, Default)]
pub struct CertificateHandlerState {

   pub requestSigns: Vec<(String, Vec<(String, String)>) >, // wallet_id -> Vec of pairs (hash, url)

   pub userTags: Vec<(String, String)>, // wallet_id -> userTag
   pub certificates: Vec<(String, Vec<(String, String)>) >, // wallet_id -> Vec of pairs (hash, url)
   pub signs: Vec<(String, Vec<String>)> // hash -> Vec of strings (wallet_id's)

   
}

// Create a implementation on State
impl CertificateHandlerState {

async fn setTagmethod(&mut self, wallet_id: String, userTag: String) -> Result<CertificateHandlerEvents, CertificateHandlerErrors> {

        // Check if the wallet_id exists in the userTags vector
        let mut found = false;
        for entry in &mut self.userTags {
            if entry.0 == wallet_id {
                // Update the userTag
                entry.1 = userTag.clone();
                found = true;
                break;
            }
        }

        // If not found, push a new entry to the userTags vector
        if !found {
            self.userTags.push((wallet_id, userTag));
        }

        
      Ok(CertificateHandlerEvents::setTagSuccess)
    }

async fn uploadCertificatemethod(&mut self, wallet_id: String, hash: String, url: String) -> Result<CertificateHandlerEvents, CertificateHandlerErrors> {

        // Check if the wallet_id exists in the certificates vector
        let mut found = false;
        for entry in &mut self.certificates {
            if entry.0 == wallet_id {
                // Add the (hash, url) pair to the existing vector
                entry.1.push((hash.clone(), url.clone()));
                found = true;
                break;
            }
        }

        // If not found, push a new entry to the certificates vector
        if !found {
            self.certificates.push((wallet_id, vec![(hash, url)]));
        }

        
      Ok(CertificateHandlerEvents::uploadSuccess)
    }
    
   async fn signCertificatemethod(&mut self, hash: String, wallet_id: String) -> Result<CertificateHandlerEvents, CertificateHandlerErrors> {

        /// Check if the hash exists in the signs vector
        let mut found = false;
        for entry in &mut self.signs {
            if entry.0 == hash {
                // Add the wallet_id to the existing vector
                entry.1.push(wallet_id.clone());
                found = true;
                break;
            }
        }

        // If not found, push a new entry to the signs vector
        if !found {
            self.signs.push((hash, vec![wallet_id]));
        }

        
      Ok(CertificateHandlerEvents::signSuccess)
    }

    async fn requestNewSignmethod(&mut self, wallet_id: String, hash: String, url: String) -> Result<CertificateHandlerEvents, CertificateHandlerErrors> {

        // Check if the wallet_id exists in the requestSigns vector
        let mut found = false;
        for entry in &mut self.requestSigns {
            if entry.0 == wallet_id {
                // Add the (hash, url) pair to the existing vector
                entry.1.push((hash.clone(), url.clone()));
                found = true;
                break;
            }
        }

        // If not found, push a new entry to the requestSigns vector
        if !found {
            self.requestSigns.push((wallet_id, vec![(hash, url)]));
        }
        
      Ok(CertificateHandlerEvents::requestSignSuccess)
    }

}

// 3. Create the init() function of your contract.
#[no_mangle]
extern "C" fn init() {
   
    let state = CertificateHandlerState {
        ..Default::default()
    };

    unsafe { STATE = Some(state) };
}

// 4.Create the main() function of your contract.
#[async_main]
async fn main() {
    // We load the input message
    let action: CertificateHandlerActions = msg::load().expect("Could not load Action");

    let state = unsafe { STATE.as_mut().expect("The contract is not initialized") };

    // We receive an action from the user and update the state. Example:

    let reply = match action {
      CertificateHandlerActions::setTag(input1, input2) =>{state.setTagmethod(input1, input2).await},
      CertificateHandlerActions::uploadCertificate(input1, input2, input3) =>{state.uploadCertificatemethod(input1, input2, input3).await},
      CertificateHandlerActions::signCertificate(input1, input2) =>{state.signCertificatemethod(input1, input2).await},
      CertificateHandlerActions::requestNewSign(input1, input2, input3) =>{state.requestNewSignmethod(input1, input2, input3).await}
    };
    msg::reply(reply, 0).expect("Error in sending a reply");
}

// // 5. Create the state() function of your contract.
// #[no_mangle]
// extern "C" fn state() {
    
//     let state = unsafe { STATE.take().expect("Unexpected error in taking state") };
//     let query: CertificateHandlerQuery = msg::load().expect("Unable to load the state query");
//     let reply = match query {
//         CertificateHandlerQuery::ReplyDefault => CertificateHandlerQueryReply::ReplyDefault(state.certificateName),
//     };
//     msg::reply(reply, 0).expect("Error on state");

// }

#[no_mangle]
extern "C" fn state() {
    let state = unsafe { STATE.take().expect("Unexpected error in taking state") };
    let query: CertificateHandlerQuery = msg::load().expect("Unable to load the state query");
    let reply = match query {
        CertificateHandlerQuery::readTags(wallet_id) => { // read wallet return tag
            let tag = state.userTags.iter().find(|(id, _)| id == &wallet_id)
                .map(|(_, tag)| tag.clone())
                .unwrap_or_default();
            CertificateHandlerQueryReply::readTags(tag)
        },
        CertificateHandlerQuery::readCertificates(wallet_id) => {
            let certs = state.certificates.iter().find(|(id, _)| id == &wallet_id)
                .map(|(_, certs)| certs.clone())
                .unwrap_or_default();
            CertificateHandlerQueryReply::readCertificates(certs)
        },
        CertificateHandlerQuery::readSigns(hash) => {
            // Find wallet IDs associated with the given hash
            let wallet_ids = state.signs.iter().find(|(h, _)| h == &hash)
                .map(|(_, ids)| ids.clone())
                .unwrap_or_default();
            
            // Map wallet IDs to their corresponding user tags
            let tags: Vec<String> = wallet_ids.iter().filter_map(|wallet_id| {
                state.userTags.iter().find(|(id, _)| id == wallet_id)
                    .map(|(_, tag)| tag.clone())
            }).collect();
            
            CertificateHandlerQueryReply::readSigns(tags)
        },
        CertificateHandlerQuery::readAllUsers => { // read wallet return urls
            CertificateHandlerQueryReply::readAllUsers(state.userTags)
        },
        CertificateHandlerQuery::readRequestCertificates(wallet_id) => {
            let certs = state.requestSigns.iter().find(|(id, _)| id == &wallet_id)
                .map(|(_, certs)| certs.clone())
                .unwrap_or_default();
            CertificateHandlerQueryReply::readRequestCertificates(certs)
        },
        CertificateHandlerQuery::ReplyDefault => {
            // Manually format the state data as a JSON string
            let mut user_tags_json = String::from("[");
            for (i, (wallet_id, user_tag)) in state.userTags.iter().enumerate() {
                if i > 0 {
                    user_tags_json.push_str(",");
                }
                user_tags_json.push_str(&format!("{{'wallet_id':'{}','user_tag':'{}'}}", wallet_id, user_tag));
            }
            user_tags_json.push_str("]");

            let mut certificates_json = String::from("[");
            for (i, (wallet_id, certs)) in state.certificates.iter().enumerate() {
                if i > 0 {
                    certificates_json.push_str(",");
                }
                certificates_json.push_str(&format!("{{'wallet_id':'{}','certificates':[", wallet_id));
                for (j, (hash, url)) in certs.iter().enumerate() {
                    if j > 0 {
                        certificates_json.push_str(",");
                    }
                    certificates_json.push_str(&format!("{{'hash':'{}','url':'{}'}}", hash, url));
                }
                certificates_json.push_str("]}");
            }
            certificates_json.push_str("]");

            let mut signs_json = String::from("[");
            for (i, (hash, wallet_ids)) in state.signs.iter().enumerate() {
                if i > 0 {
                    signs_json.push_str(",");
                }
                signs_json.push_str(&format!("{{'hash':'{}','wallet_ids':[", hash));
                for (j, wallet_id) in wallet_ids.iter().enumerate() {
                    if j > 0 {
                        signs_json.push_str(",");
                    }
                    signs_json.push_str(&format!("'{}'", wallet_id));
                }
                signs_json.push_str("]}");
            }
            signs_json.push_str("]");

            let full_state_json = format!(
                "{{'userTags':{},'certificates':{},'signs':{}}}",
                user_tags_json, certificates_json, signs_json
            );

            CertificateHandlerQueryReply::ReplyDefault(full_state_json)
        },
    };

    msg::reply(reply, 0).expect("Error on state");
}
