# Architecture design document for backend of PlexaSync

## Models:

* HMIs
* Devices
* Drivers
* Users



## Drivers:

A Driver is a file that the user will upload from his machine and will be saved to /root/drivers/{driver-id}.plexad

its a json encoded file with the clients decryption key, for version V0.x.x we will only use json files without any decryption algorithms

in a driver file we are defining the software version its compatible with, the device reference and id, the protocol that the driver defines, the protocol informations, like in modbus the list of register that the software will read/write from/to, the driver could also contain some precoded scenarios or action sequence, that are related to that specific device, which are basically a list of orders the software will be executing on the device when a user initiate that sequence.

one of these scenarios for example is the "status scenario" which the actions we will execute to know the status of a device: "Online", "offline", "refuse to connect", "warrning"


## Devices:

Devices are an instance of a Driver , its basically just the address definition that the software will use the driver to communicate with.

The only purpose to define a device, is that you can be able while creating HMIs to add a variable in your HMI that belongs to that device. so its like in your HMI you can click on add a variable, so that you can monitor that variable in your HMI, and then from the list of devices after selecting a device, you will get a list of all variables name that you can add to an HMI.

interface Device {

    name: string;  // atv 1 post 1-12

    driver: string (driver-id);

    ip_address: number[];  // [192,168,1,70]

    port: number; // 502

    settings: json; // {enable_scripts:false, .....}

}


## Users:

Users are the actual users that will be able to access the software, users will have Permissions, persmissions are things like being able to create, edit or delete HMIs, create, edit or delete devices. this doesn't mean that if we only want a specific user to have single access (edit,delete) to a specific device or HMI that we can't do it, totally no, we will be able to do that from the device/HMI page it self.


interface User {

    id: string;

    username: string;

    password: string;

}

interface Permission {

    id: string;

    type: string; //

    name: string;

}

interface UserPermission{

    user_id: string;

    permission_id: string;

}
