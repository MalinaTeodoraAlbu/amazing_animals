
import './style/index.css';
import './style/settings.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import subscriptionOptions from './setari/subscriptionData';
import IconButton from '@mui/material/IconButton';
import { amber, purple } from '@mui/material/colors';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Document, Page, Text, View, StyleSheet ,pdf} from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import logo from './media/Amzing_logo.png'
import thankyouImage from './media/tha.png'

const userID_LOCAL = localStorage.getItem('userId');
console.log("USER LOCAl",userID_LOCAL)



function Settings(props) {
  const [toggleState, setToggleState] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [city, setCity] = useState(null);
  const [birthday, setbirthday] = useState(null)
  const [phoneNumber, setphoneNumber] = useState(null);
  const userId = localStorage.getItem('userId');
  const [name, setName] = useState("");
  const [picture, setPicture] = useState('');
  const [pictureA, setPictureA] = useState('');
  const [bio, setBio] = useState("");
  const[ userType, setuserType] = useState("");
  const [followers, setfollowers] = useState([]);
  const [followings, setfollowings] = useState([]);
  const [subscription, setsubscription] = useState(null);
  const [subscriptionID, setsubscriptionID] = useState("");
  
  const toggleTab = (index) => {
    setToggleState(index);
  };



  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setPictureA(event.target.files[0])
    
    reader.onloadend = () => {
      setPicture(reader.result);
      
    };
    if (file) {
      reader.readAsDataURL(file);
      console.log(file)
    }
  };

  const handleSubscriptions = () => {
    props.setIsPopupOpenSub(true);
  };

  console.log("here is ",subscription)

  useEffect(() => {
    if(userId){
      fetch(`http://localhost:7070/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUser(data)
          setName(data.name)
          setBio(data.bio)
          setCity(data.city)
          setEmail(data.email)
          setPicture(`http://localhost:7070/${data.imagePaths}`)
          setPassword(data.password)
          setphoneNumber(data.phoneNumber)
          setbirthday(data.birthday)
          setuserType(data.userType)
          setuserType(data.userType)
                  
        });

    }
    
    fetch(`http://localhost:7070/api/users/${userId}/subscription`)
    .then((response) => response.json())
    .then((data) => {
      console.log(subscription)
      setsubscription(data);
      setsubscriptionID(data._id); 
      
      });
    
    }, []);
    console.log("Ia sa vedem",subscriptionID)
    console.log(subscription)
    const handleEdit = () => {
      setIsEditing(true);

    };
  
    const handleSave = async () => {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('city', city);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('bio', bio);
      formData.append('birthday', birthday);
      formData.append('userType',userType)
      formData.append('imagePaths', pictureA);
      console.log(pictureA)
      
      try {
        const response = await axios.put(`http://localhost:7070/api/users/${userId}`, formData);
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleCancel = () => {
      
      setIsEditing(false);
    };

    const handleCancelSubscription = async () => {
      const subscriptionData = {
        subscriptionType: subscription.subscriptionType,
        startDate: subscription.startDate,
        price: subscription.price,
        userid: userID_LOCAL,
        status: "Canceled",
        nextBillingDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
      };
    
      if (subscription) {
        console.log("upgrade");
        try {
          const response = await axios.put(
            `http://localhost:7070/api/subscription/${subscriptionID}`,
            subscriptionData
          );

          window.location.href = `/settings`;
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    
      let formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("bio", bio);
      formData.append("birthday", birthday);
      formData.append("userType", 'Standard');
      formData.append("imagePaths", pictureA);
      console.log(pictureA);
    
      try {
        const updateUserResponse = await axios.put(
          `http://localhost:7070/api/users/${userID_LOCAL}`,
          formData
        );
        window.location.href = `/settings`;
      } catch (error) {
        console.error(error);
      }
    }
    

    const hanndlePDF = async () => {
      const styles = StyleSheet.create({
        page: {
          fontFamily: 'Helvetica',
          fontSize: 11,
          paddingTop: 30,
          paddingLeft: 60,
          paddingRight: 60,
          lineHeight: 1.5,
          flexDirection: 'column',
        },
        titleContainer: {
          flexDirection: 'row',
          borderBottom: 1,
          borderBottomColor: '#112131',
          borderBottomWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        },
        reportTitle: {
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'purple', // Set the color to purple
        },
        invoiceNoContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
          marginBottom: 5,
        },
        invoiceDateContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        invoiceDate: {
          fontSize: 12,
          fontWeight: 'bold',
          color: 'purple', // Set the color to purple
        },
        label: {
          width: 60,
        },
        headerContainer: {
          marginTop: 20,
        },
        billTo: {
          marginTop: 20,
          paddingBottom: 5,
          fontFamily: 'Helvetica-Oblique',
          color: 'purple', // Set the color to purple
        },
        details: {
          marginTop: 20,
          paddingBottom: 5,
        },
        tableContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 36,
          borderWidth: 1,
          borderColor: '#112131',
          borderRadius: 5,
        },
        tableHeaderContainer: {
          flexDirection: 'row',
          borderBottomColor: '#112131',
          backgroundColor: '#f0f0f0',
          borderBottomWidth: 1,
          alignItems: 'center',
          height: 24,
          textAlign: 'center',
          fontStyle: 'bold',
          flexGrow: 1,
          fontSize: 12,
        },
        tableHeader: {
          width: '33%',
        },
        tableRow: {
          flexDirection: 'row',
          borderBottomColor: '#112131',
          borderBottomWidth: 1,
          alignItems: 'center',
          height: 24,
          textAlign: 'center',
          flexGrow: 1,
          fontSize: 10,
        },
        description: {
          width: '33%',
        },
        rate: {
          width: '33%',
        },
        totalsContainer: {
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        totalsBox: {
          width: 150,
          lineHeight: 2,
          marginLeft: 20,
          textAlign: 'right',
        },
        grandTotalBox: {
          width: 150,
          lineHeight: 2,
          textAlign: 'right',
        },
        termsContainer: {
          marginTop: 30,
        },
        termsTitle: {
          marginBottom: 5,
          fontWeight: 'bold',
        },
        logo: {
          width: 100,
          height: 150,
        },
        thankyouImage: {
          width: '100%',
          height: '100%',
        },
        pageBreak: {
          pageBreakAfter: 'always',
        },
      });
    
      const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.titleContainer}>
              <Text style={styles.reportTitle}>Invoice</Text>
            </View>
    
            <Image src={logo} style={styles.logo} />
    
            <View style={styles.invoiceNoContainer}>
              <Text>Invoice No: </Text>
              <Text>{Math.floor(Math.random() * 100000)}</Text>
            </View>
    
            <View style={styles.invoiceDateContainer}>
              <Text style={styles.invoiceDate}>
                Invoice Date: {new Date(subscription.startDate).toLocaleDateString('en-GB')}
              </Text>
            </View>
    
            <View style={styles.headerContainer}>
              <Text style={styles.billTo}>Bill To:</Text>
              <Text style={styles.details}>{user.name}</Text>
              <Text style={styles.details}>{user.email}</Text>
              <Text style={styles.details}>{user.phoneNumber}</Text>
              <Text style={styles.details}>{user.city}</Text>
            </View>
    
            <View style={styles.tableContainer}>
              <View style={styles.tableHeaderContainer}>
                <Text style={styles.tableHeader}>Description</Text>
                <Text style={styles.tableHeader}>Price</Text>
                <Text style={styles.tableHeader}>Next Billing Date</Text>
              </View>
    
              <View style={styles.tableRow}>
                <Text style={styles.description}>{subscription.subscriptionType}</Text>
                <Text style={styles.rate}>{subscription.price}</Text>
                <Text style={styles.description}>
                  {new Date(subscription.nextBillingDate).toLocaleDateString('en-GB')}
                </Text>
              </View>
            </View>
    
            <View style={styles.totalsContainer}>
              <View style={styles.totalsBox}>
                <Text>Total:</Text>
              </View>
              <View style={styles.totalsBox}>
                <Text>{subscription.price} RON</Text>
              </View>
            </View>
    
            <View style={styles.pageBreak} />
            <Image src={thankyouImage} style={styles.thankyouImage} />
          </Page>
        </Document>
      );
    
      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    };
    

  return (
    <div className="settings">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
         <p id='p_tab'>Account</p> 
        </button>

        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
        <p id='p_tab'>Manage Subscription</p> 
        </button>
        
      </div>

      <div className="content-tabs">
      <div className={toggleState === 1 ? "content-set active-content" : "content-set"}>
  {user && (
    <div className="user-settings-container">
      <div className="settings_user">
        <label>Name: </label>
        {isEditing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <h2>{user.name}</h2>
        )}
        <label>Email: </label>
        {isEditing ? (
          <input value={email}  onChange={(e) => setEmail(e.target.value)} />
        ) : (
          <h2>{user.email}</h2>
        )}
        <label>Bio: </label>
        {isEditing ? (
          <input value={bio}  onChange={(e) => setBio(e.target.value)} />
        ) : (
          <h2>{user.bio}</h2>
        )}
        <label>Phone number: </label>
        {isEditing ? (
          <input value={phoneNumber}  onChange={(e) => setphoneNumber(e.target.value)} />
        ) : (
          <h2>{user.phoneNumber}</h2>
        )}
        <label>Birthday: </label>
        {isEditing ? (
          <input
            value={new Date(user.birthday).toLocaleDateString("en-GB")}
            onChange={(e) => setbirthday(e.target.value)}
          />
        ) : (
          <h2>{new Date(user.birthday).toLocaleDateString("en-GB")}</h2>
        )}
        <label>City: </label>
        {isEditing ? (
          <input value={city}  onChange={(e) => setCity(e.target.value)} />
        ) : (
          <h2>{user.city}</h2>
        )}
        
    </div>
    <div className="sett_user_right"> 
        <div className="sett_img-user">
        {isEditing ? (
                    <div className="image-add_set">
                    <img src={picture} alt="Profile Picture" />
                    <input type="file" id="imput_photo_set" accept="image/png, image/gif, image/jpeg" onChange={handlePictureChange} /></div>
        ) : (
          <img src={picture} alt="Profile Picture" />
        )}
      </div>
        {isEditing ? (
          <div className="user_edit_buttons">
                  <button onClick={handleSave}>Save</button>
                   <button onClick={handleCancel}>Cancel</button>
                   </div>
        ) : (
          <div className="user_edit_buttons">
          <button onClick={handleEdit}>edit</button>
            </div>
        )}

        </div>

      
        </div>

  )}
</div>

        <div
          className={toggleState === 2 ? "content-set  active-content" : "content-set"}
        >
 
          <p></p>
        </div>

        <div
          className={toggleState === 3 ? "content-set  active-content" : "content-set"}
        >
          <div className='subscriptions-container'>
           <div className='subscriptions'>
          {user && user.userType === 'Standard' && ( 
            <div>
           <div className="subscriptions_">
            {subscriptionOptions.map((option) => {
              if (option.type === user.userType) {
                return (
                  <div key={option.type}>
                    <h2>Current Subscription</h2>
                    <p>Type: {option.type}</p>
                    <h3>Benefits:</h3>
                    <ul>
                      {option.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <button class="button_sub" onClick={handleSubscriptions}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                    </svg>
                    Upgrade Subscription
                </button>
                   
                  </div>
                );
              }
              return null;
            })}
          </div>

          </div>)}
          {user && user.userType === 'Premium' && ( 
                      <div>

           <div className="subscriptions_">
            {subscriptionOptions.map((option) => {
              if (option.type === user.userType) {
                return (
                  <div key={option.type}>
                    <h2>Current Subscription</h2>
                    <p>Type: {option.type}</p>
                    <p>Billing Period: {option.billingPeriod}</p>
                    <p>Price: {option.price} RON</p>
                    <h3>Benefits:</h3>
                    <ul>
                      {option.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <button onClick={handleCancelSubscription} >Cancel subscription</button>
                  </div>
                  
                );
              }
              return null;
            })}
          </div>

          </div>)}
          {user && user.userType === 'Vet' && ( 
                     <div>

           <div className="subscriptions_">
            {subscriptionOptions.map((option) => {
              if (option.type === user.userType) {
                return (
                  <div key={option.type}>
                    <h2>Current Subscription</h2>
                    <p>Type: {option.type}</p>
                    <p>Billing Period: {option.billingPeriod}</p>
                    <p>Price: {option.price} RON</p>
                    <h3>Benefits:</h3>
                    <ul>
                      {option.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    
                    <button onClick={handleCancelSubscription}>Cancel subscription</button>
                  </div>
                );
              }
              return null;
            })}
          </div>

          </div>)}
         {/**<button>View All Subscriptions</button> */} 
          </div>
          
        </div>
       
          {subscription && (
           <div className='payment_div'>
            <h2>Last subscription details</h2>
              <p>Subscription Type : {subscription.subscriptionType}</p>
              <p>Start Date : {new Date(subscription.startDate).toLocaleDateString("en-GB")}</p>
              <p>Price : {subscription.price}</p>
              <p>Status : {subscription.status}</p>
              <p>Next Billing Date : {new Date(subscription.nextBillingDate).toLocaleDateString("en-GB")}</p>
              <IconButton aria-label="edit" color="secondary" sx={{ color: purple[500] }} onClick={hanndlePDF}> 
                  <InsertDriveFileIcon fontSize="large"  />
                </IconButton>
            </div>)}
           
        </div>
       
        <div
          className={toggleState === 4 ? "content-set  active-content" : "content-set"}
        >
          <p>This is the content for tab 4.</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
