"use client";
import React from "react";
import bgImage from "@/app/assets/bgImage.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../landing.css";
function Landing() {
  const router = useRouter();
  return (
    <main className="h-auto md:h-screen min-h-screen relative z-30">
      <div className="h-full w-full flex items-center justify-center">
        <div className="bg-white bg-opacity-70 h-[80%] w-[80%] overflow-auto rounded-lg p-4 text-black">
          <p>Dear Delegates,</p>
          <p>
            <br />
          </p>
          <p>
            Thank you for your interest in registering for the &lsquo;BHARAT
            DALHAN SEMINAR 2024&rsquo; to be held on August 9<sup>th</sup>,
            2024, at&nbsp;Vigyan Bhawan, Delhi, India.&nbsp;
          </p>
          <p>
            <br />
          </p>
          <p>
            Before you proceed with the Registration, we would like to draw you
            attention to a few key factors and request you to please read them
            carefully. Please feel free to write to us at{" "}
            <a href="mailto:bds2024@ipga.co.in">bds2024@ipga.co.in</a> in case
            you have any queries or need any clarifications.
          </p>
          <p>
            <br />
          </p>
          <p>
            <strong>
              REGISTRATION FOR THE &lsquo;BHARAT DALHAN SEMINAR 2024&rsquo;
            </strong>
          </p>
          <p>
            <br />
          </p>
          <p>The Registration Fees for each Delegate are as follows:</p>
          <p>
            <br />
          </p>
          <table
            className="border-collapse border border-black"
            cellSpacing="0"
            cellPadding="0"
          >
            <tbody>
              <tr>
                <td className="border border-black" rowspan="2" valign="middle">
                  <p>
                    <br />
                  </p>
                </td>
                <td className="border border-black" colspan="2" valign="middle">
                  <p>
                    <strong>INDIAN DELEGATES (INR)</strong>
                  </p>
                </td>
                <td className="border border-black" valign="middle">
                  <p>
                    <strong>INTERNATIONAL DELEGATES (USD)</strong>
                  </p>
                </td>
              </tr>

              <tr className="">
                <td className="border border-black" valign="middle">
                  <p>
                    <strong>Patron</strong>
                  </p>
                </td>
                <td className="border border-black" valign="middle">
                  <p>
                    <strong>Non Patron</strong>
                  </p>
                </td>
                <td className="border border-black" valign="middle">
                  <p>
                    <strong>Per Delegate</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="border border-black" valign="middle">
                  <p>
                    <br />
                  </p>
                </td>
                <td className="border border-black" valign="bottom">
                  <p>2,000 + Tax</p>
                </td>
                <td className="border border-black" valign="bottom">
                  <p>3,000 + Tax</p>
                </td>
                <td className="border border-black" valign="bottom">
                  <p>100 + Tax</p>
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            <br />
          </p>
          <p>
            <strong>GENERAL TERMS AND CONDITIONS</strong>
          </p>
          <ol>
            <li>
              Above cost exclude taxes. In the event of any change in Taxes by
              the Government of India, these rates will change accordingly from
              the date such changes are enforced by the Government of India.
            </li>
            <li>
              All IPGA Patrons{" "}
              <strong>
                <em>(whose patronship fees are fully paid till date)</em>
              </strong>{" "}
              shall receive UNIQUE Code on their registered email id to register
              for the Seminar.
            </li>
            <li>
              Indian Delegates who are not IPGA Patrons should use the link
              given below to register for the Seminar.
            </li>
            <li>
              All Group Bookings{" "}
              <strong>
                <em>(more than five delegates from the same organization)</em>
              </strong>{" "}
              will be handled offline. Please connect with IPGA Team at{" "}
              <a href="mailto:bds2024@ipga.co.in">bds2024@ipga.co.in</a> to
              complete the process.
            </li>
            <li>
              All International Delegates shall pay in US Dollars. International
              Delegates will automatically get the applicable rates once they
              choose the &ldquo;Country&rdquo; field in the Registration
              Process.
            </li>
            <li>
              All International Delegates MUST read the VISA APPLICATION PROCESS
              before proceeding to Register.
            </li>
          </ol>
          <ul>
            <li>
              <strong>GUIDELINES FOR REGISTRATION:</strong>
              <ul>
                <li>All fields are mandatory.</li>
                <li>Please tick on the relevant option.</li>
                <li>
                  All IPGA Patrons (whose patronship fees are fully paid till
                  date) shall receive UNIQUE Code on their registered email id
                  to register for the event.
                </li>
                <li>
                  All Group Bookings (more than three delegates from the same
                  organization) will be handled offline. Please connect with
                  IPGA Team at BHARAT DALHAN SEMINAR 2024{" "}
                  <a href="mailto:bds2024@ipga.co.in">bds2024@ipga.co.in</a> to
                  complete the process.
                </li>
                <li>
                  All International Delegates MUST read the VISA APPLICATION
                  PROCESS before proceeding to Register.
                </li>
                <li>
                  Invoice cum Receipt bearing the Registration ID will be sent
                  to all registered delegates by email. This must be presented
                  at the registration counter.
                </li>
                <li>
                  The delegates must mention their registration ID in all future
                  correspondence.
                </li>
                <li>
                  After receiving the confirmation e-mail, contact us
                  immediately for any spelling errors or changes.
                </li>
              </ul>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <strong>CANCELLATION POLICY:</strong>
              <ul>
                <li>As mentioned on website in the Registration Tab.</li>
              </ul>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <strong>PRIVACY POLICY:&nbsp;</strong>
              <ul>
                <li>Please click here to read our Privacy Policy.</li>
              </ul>
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => router.push("/login")}
              className="bg-[#404A3D] p-4 rounded-md text-white"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Landing;
