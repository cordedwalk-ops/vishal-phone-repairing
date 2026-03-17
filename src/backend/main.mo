import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  public type ServiceType = {
    #batteryReplacement;
    #cameraRepair;
    #chargerPortRepair;
    #waterDamageRepair;
    #screenDamageRepair;
  };

  public type BookingSubmission = {
    id : Nat;
    customerName : Text;
    phoneNumber : Text;
    deviceModel : Text;
    serviceType : ServiceType;
    message : Text;
    timestamp : Time.Time;
  };

  module BookingSubmission {
    public func compare(submission1 : BookingSubmission, submission2 : BookingSubmission) : Order.Order {
      Int.compare(submission2.timestamp, submission1.timestamp);
    };
  };

  let bookings = Map.empty<Nat, BookingSubmission>();
  var nextId = 0;

  func validatePhoneNumber(phone : Text) : Bool {
    let chars = phone.toArray();
    let digits = chars.filter(
      func(c) {
        c >= '0' and c <= '9'
      }
    );
    digits.size() == 10;
  };

  func validateSubmission(submission : BookingSubmission) {
    if (submission.customerName.isEmpty()) {
      Runtime.trap("Customer name cannot be empty.");
    };
    if (not validatePhoneNumber(submission.phoneNumber)) {
      Runtime.trap("Invalid phone number.");
    };
    if (submission.deviceModel.isEmpty()) {
      Runtime.trap("Device model cannot be empty.");
    };
    if (submission.message.isEmpty()) {
      Runtime.trap("Message cannot be empty.");
    };
  };

  public shared ({ caller }) func submitBooking(
    customerName : Text,
    phoneNumber : Text,
    deviceModel : Text,
    serviceType : ServiceType,
    message : Text,
  ) : async Nat {
    let id = nextId;
    let submission : BookingSubmission = {
      id;
      customerName;
      phoneNumber;
      deviceModel;
      serviceType;
      message;
      timestamp = Time.now();
    };

    validateSubmission(submission);

    bookings.add(id, submission);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getAllBookings() : async [BookingSubmission] {
    bookings.values().toArray().sort();
  };

  public query ({ caller }) func getBookingById(id : Nat) : async BookingSubmission {
    switch (bookings.get(id)) {
      case (?submission) { submission };
      case (null) { Runtime.trap("Booking not found") };
    };
  };

  public query ({ caller }) func getBookingsByServiceType(serviceType : ServiceType) : async [BookingSubmission] {
    bookings.values().toArray().filter(
      func(submission) { submission.serviceType == serviceType }
    );
  };

  public query ({ caller }) func getBookingsByCustomerName(customerName : Text) : async [BookingSubmission] {
    bookings.values().toArray().filter(
      func(submission) { Text.equal(submission.customerName, customerName) }
    );
  };
};
