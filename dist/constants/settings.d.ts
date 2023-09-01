export type Settings = {
    [SettingsName.API_Gitlab_URL]?: string;
    [SettingsName.Accounts_AddGuestsToChats]?: boolean;
    [SettingsName.Accounts_AllowEmailChange]?: boolean;
    [SettingsName.Accounts_AllowInvisibleStatusOption]?: boolean;
    [SettingsName.Accounts_AllowPasswordChange]?: boolean;
    [SettingsName.Accounts_AllowRealNameChange]?: boolean;
    [SettingsName.Accounts_AllowUserAvatarChange]?: boolean;
    [SettingsName.Accounts_AllowUserProfileChange]?: boolean;
    [SettingsName.Accounts_AllowUserStatusMessageChange]?: boolean;
    [SettingsName.Accounts_AllowUsernameChange]?: boolean;
    [SettingsName.Accounts_AvatarBlockUnauthenticatedAccess]?: boolean;
    [SettingsName.Accounts_CustomFields]?: string;
    [SettingsName.Accounts_Directory_DefaultView]?: string;
    [SettingsName.Accounts_EmailOrUsernamePlaceholder]?: string;
    [SettingsName.Accounts_EmailVerification]?: boolean;
    [SettingsName.Accounts_Iframe_api_method]?: string;
    [SettingsName.Accounts_Iframe_api_url]?: string;
    [SettingsName.Accounts_ManuallyApproveNewUsers]?: boolean;
    [SettingsName.Accounts_PasswordPlaceholder]?: string;
    [SettingsName.Accounts_PasswordReset]?: boolean;
    [SettingsName.Accounts_RegistrationForm]?: string;
    [SettingsName.Accounts_RegistrationForm_LinkReplacementText]?: string;
    [SettingsName.Accounts_ShowFormLogin]?: boolean;
    [SettingsName.Accounts_iframe_enabled]?: boolean;
    [SettingsName.Allow_Save_Media_to_Gallery]?: boolean;
    [SettingsName.Assets_favicon_512]?: null;
    [SettingsName.AutoTranslate_Enabled]?: boolean;
    [SettingsName.CAS_enabled]?: boolean;
    [SettingsName.CAS_login_url]?: string;
    [SettingsName.CROWD_Enable]?: boolean;
    [SettingsName.DirectMesssage_maxUsers]?: number;
    [SettingsName.Discussion_enabled]?: boolean;
    [SettingsName.E2E_Enable]?: boolean;
    [SettingsName.FEDERATION_Enabled]?: boolean;
    [SettingsName.FileUpload_MaxFileSize]?: number;
    [SettingsName.FileUpload_MediaTypeWhiteList]?: string;
    [SettingsName.Force_Screen_Lock]?: boolean;
    [SettingsName.Force_Screen_Lock_After]?: number;
    [SettingsName.Hide_System_Messages]?: Array<string>;
    [SettingsName.Jitsi_Domain]?: string;
    [SettingsName.Jitsi_Enable_Channels]?: boolean;
    [SettingsName.Jitsi_Enable_Teams]?: boolean;
    [SettingsName.Jitsi_Enabled]?: boolean;
    [SettingsName.Jitsi_Enabled_TokenAuth]?: boolean;
    [SettingsName.Jitsi_SSL]?: boolean;
    [SettingsName.Jitsi_URL_Room_Prefix]?: string;
    [SettingsName.LDAP_Enable]?: boolean;
    [SettingsName.Livechat_request_comment_when_closing_conversation]?: boolean;
    [SettingsName.Message_AllowConvertLongMessagesToAttachment]?: boolean;
    [SettingsName.Message_AllowDeleting]?: boolean;
    [SettingsName.Message_AllowDeleting_BlockDeleteInMinutes]?: number;
    [SettingsName.Message_AllowEditing]?: boolean;
    [SettingsName.Message_AllowEditing_BlockEditInMinutes]?: number;
    [SettingsName.Message_AllowPinning]?: boolean;
    [SettingsName.Message_AllowStarring]?: boolean;
    [SettingsName.Message_AudioRecorderEnabled]?: boolean;
    [SettingsName.Message_GroupingPeriod]?: number;
    [SettingsName.Message_MaxAllowedSize]?: number;
    [SettingsName.Message_Read_Receipt_Enabled]?: boolean;
    [SettingsName.Message_Read_Receipt_Store_Users]?: boolean;
    [SettingsName.Message_TimeAndDateFormat]?: string;
    [SettingsName.Message_TimeFormat]?: string;
    [SettingsName.Site_Name]?: string;
    [SettingsName.Site_Url]?: string;
    [SettingsName.Store_Last_Message]?: boolean;
    [SettingsName.Threads_enabled]?: boolean;
    [SettingsName.UI_Allow_room_names_with_special_chars]?: boolean;
    [SettingsName.UI_Use_Real_Name]?: boolean;
    [SettingsName.UTF8_Names_Validation]?: string;
    [SettingsName.uniqueID]?: string;
};
export declare enum SettingsName {
    API_Gitlab_URL = "API_Gitlab_URL",
    Accounts_AddGuestsToChats = "Accounts_AddGuestsToChats",
    Accounts_AllowEmailChange = "Accounts_AllowEmailChange",
    Accounts_AllowInvisibleStatusOption = "Accounts_AllowInvisibleStatusOption",
    Accounts_AllowPasswordChange = "Accounts_AllowPasswordChange",
    Accounts_AllowRealNameChange = "Accounts_AllowRealNameChange",
    Accounts_AllowUserAvatarChange = "Accounts_AllowUserAvatarChange",
    Accounts_AllowUserProfileChange = "Accounts_AllowUserProfileChange",
    Accounts_AllowUserStatusMessageChange = "Accounts_AllowUserStatusMessageChange",
    Accounts_AllowUsernameChange = "Accounts_AllowUsernameChange",
    Accounts_AvatarBlockUnauthenticatedAccess = "Accounts_AvatarBlockUnauthenticatedAccess",
    Accounts_CustomFields = "Accounts_CustomFields",
    Accounts_Directory_DefaultView = "Accounts_Directory_DefaultView",
    Accounts_EmailOrUsernamePlaceholder = "Accounts_EmailOrUsernamePlaceholder",
    Accounts_EmailVerification = "Accounts_EmailVerification",
    Accounts_Iframe_api_method = "Accounts_Iframe_api_method",
    Accounts_Iframe_api_url = "Accounts_Iframe_api_url",
    Accounts_ManuallyApproveNewUsers = "Accounts_ManuallyApproveNewUsers",
    Accounts_NamePlaceholder = "Accounts_NamePlaceholder",
    Accounts_PasswordPlaceholder = "Accounts_PasswordPlaceholder",
    Accounts_PasswordReset = "Accounts_PasswordReset",
    Accounts_RegistrationForm = "Accounts_RegistrationForm",
    Accounts_RegistrationForm_LinkReplacementText = "Accounts_RegistrationForm_LinkReplacementText",
    Accounts_ShowFormLogin = "Accounts_ShowFormLogin",
    Accounts_iframe_enabled = "Accounts_iframe_enabled",
    Allow_Save_Media_to_Gallery = "Allow_Save_Media_to_Gallery",
    Assets_favicon_512 = "Assets_favicon_512",
    AutoTranslate_Enabled = "AutoTranslate_Enabled",
    CAS_enabled = "CAS_enabled",
    CAS_login_url = "CAS_login_url",
    CROWD_Enable = "CROWD_Enable",
    DeepLink_Url = "DeepLink_Url",
    DirectMesssage_maxUsers = "DirectMesssage_maxUsers",
    Discussion_enabled = "Discussion_enabled",
    E2E_Enable = "E2E_Enable",
    FEDERATION_Enabled = "FEDERATION_Enabled",
    FileUpload_MaxFileSize = "FileUpload_MaxFileSize",
    FileUpload_MediaTypeWhiteList = "FileUpload_MediaTypeWhiteList",
    Force_Screen_Lock = "Force_Screen_Lock",
    Force_Screen_Lock_After = "Force_Screen_Lock_After",
    Hide_System_Messages = "Hide_System_Messages",
    Jitsi_Domain = "Jitsi_Domain",
    Jitsi_Enable_Channels = "Jitsi_Enable_Channels",
    Jitsi_Enable_Teams = "Jitsi_Enable_Teams",
    Jitsi_Enabled = "Jitsi_Enabled",
    Jitsi_Enabled_TokenAuth = "Jitsi_Enabled_TokenAuth",
    Jitsi_SSL = "Jitsi_SSL",
    Jitsi_URL_Room_Prefix = "Jitsi_URL_Room_Prefix",
    LDAP_Enable = "LDAP_Enable",
    Livechat_request_comment_when_closing_conversation = "Livechat_request_comment_when_closing_conversation",
    Message_AllowConvertLongMessagesToAttachment = "Message_AllowConvertLongMessagesToAttachment",
    Message_AllowDeleting = "Message_AllowDeleting",
    Message_AllowDeleting_BlockDeleteInMinutes = "Message_AllowDeleting_BlockDeleteInMinutes",
    Message_AllowEditing = "Message_AllowEditing",
    Message_AllowEditing_BlockEditInMinutes = "Message_AllowEditing_BlockEditInMinutes",
    Message_AllowPinning = "Message_AllowPinning",
    Message_AllowStarring = "Message_AllowStarring",
    Message_AudioRecorderEnabled = "Message_AudioRecorderEnabled",
    Message_GroupingPeriod = "Message_GroupingPeriod",
    Message_MaxAllowedSize = "Message_MaxAllowedSize",
    Message_Read_Receipt_Enabled = "Message_Read_Receipt_Enabled",
    Message_Read_Receipt_Store_Users = "Message_Read_Receipt_Store_Users",
    Message_TimeAndDateFormat = "Message_TimeAndDateFormat",
    Message_TimeFormat = "Message_TimeFormat",
    Private_Cloud_Files_Url = "private_cloud-files-url",
    Site_Name = "Site_Name",
    Site_Url = "Site_Url",
    Store_Last_Message = "Store_Last_Message",
    Threads_enabled = "Threads_enabled",
    UI_Allow_room_names_with_special_chars = "UI_Allow_room_names_with_special_chars",
    UI_Use_Real_Name = "UI_Use_Real_Name",
    UTF8_Names_Validation = "UTF8_Names_Validation",
    Video_Conference_Enabled = "Video_Conference_Enabled",
    uniqueID = "uniqueID"
}
