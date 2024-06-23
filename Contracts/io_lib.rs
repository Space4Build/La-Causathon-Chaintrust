
    #![no_std]

    use gmeta::{In, InOut, Metadata, Out};
    use gstd::{prelude::*, ActorId};

    pub struct ProgramMetadata;

    // 1. Define actions, events, errors and state for your metadata.
    impl Metadata for ProgramMetadata {
        type Init = In<InitStruct>;
        type Handle = InOut<CertificateHandlerActions, Result<CertificateHandlerEvents, CertificateHandlerErrors>>;
        type Others = ();
        type Reply = ();
        type Signal = ();
        type State = InOut<CertificateHandlerQuery, CertificateHandlerQueryReply>;
    }

    // 2. Create your init Struct(Optional)
    #[derive(Decode, Encode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub struct InitStruct {
        // Example:
        pub ft_program_id: ActorId,
    }

    // 3. Create your own Actions
    #[derive(Debug, Decode, Encode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub enum CertificateHandlerActions {
        // Actions
    setTag(String, String),
    uploadCertificate(String, String, String),
    signCertificate(String, String),
    requestNewSign(String, String, String)
    }

    // Add Your Main State
    #[derive(Debug, Decode, Encode,  Clone, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub struct CertificateHandlerState {

    pub userTags: Vec<(String, String)>, // wallet_id -> userTag
    pub certificates: Vec<(String, Vec<(String, String)>) >, // wallet_id -> Vec of pairs (hash, url)
    pub signs: Vec<(String, Vec<String>)> // hash -> Vec of strings (wallet_id's)
    }

    // 4. Create your own Events
    #[derive(Debug, Decode, Encode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub enum CertificateHandlerEvents {
        // Events
    setTagSuccess,
    uploadSuccess,
    signSuccess,
    requestSignSuccess
    }

    // 5. Create your own Errors
    #[derive(Debug, Decode, Encode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub enum CertificateHandlerErrors {


    }

    // 6. Create your own Struct
    #[derive(Debug, Decode, Encode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub struct CertificateHandlerCustomFields {
        
    }

    // 7. Create your own enum
    #[derive(Debug, Decode, Encode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub enum CustomStates {
        // Add your states
    }

    #[derive(Encode, Decode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub enum CertificateHandlerQuery {
        ReplyDefault,
        readTags(String), // read wallet and return tag
        readCertificates(String), // read wallet and return urls
        readSigns(String), // read hash and return tags
        
        readAllUsers,
        readRequestCertificates(String),
    }

    #[derive(Encode, Decode, TypeInfo)]
    #[codec(crate = gstd::codec)]
    #[scale_info(crate = gstd::scale_info)]
    pub enum CertificateHandlerQueryReply {
        ReplyDefault(String),
        readTags(String),
        readCertificates(Vec<(String,String)>),
        readSigns(Vec<String>), 

        readAllUsers(Vec<(String, String)>),
        readRequestCertificates(Vec<(String, String)>),
    }
