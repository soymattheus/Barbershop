import {
  FaInstagram,
  FaLocationArrow,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Contact() {
  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4 items-stretch">
      <div className="flex w-full items-center justify-center md:justify-start">
        <p className="text-text text-2xl text-bold">Contact</p>
      </div>
      <div className=" flex flex-col w-full">
        <div className="flex flex-row gap-2 items-center">
          <FaWhatsapp className="text-primary" />{' '}
          <a
            href="https://wa.me/5579998942110"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text font-medium hover:underline"
          >
            +55 79 99894-2110
          </a>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FaInstagram className="text-primary" />{' '}
          <a
            href="https://www.instagram.com/soymattheus/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text font-medium hover:underline"
          >
            @soymattheus
          </a>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FaTiktok className="text-primary" />{' '}
          <a
            href="https://www.tiktok.com/@soymattheus0?_t=ZM-8vJPAiOYWVK&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text font-medium hover:underline"
          >
            @soymattheus0
          </a>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FaYoutube className="text-primary" />{' '}
          <a
            href="https://www.youtube.com/@matheustavares6742"
            target="_blank"
            className="text-text font-medium hover:underline"
            rel="noreferrer"
          >
            Our channel
          </a>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <MdEmail className="text-primary" />{' '}
          <a
            href="mailto:matheustavares1a@gmail.com"
            className="text-text font-medium hover:underline truncate"
          >
            matheustavares1a@gmail.com
          </a>
        </div>

        <hr className="my-2 md:my-4 text-text" />

        <div className="flex flex-row gap-2 items-center">
          <FaLocationArrow className="text-primary" />{' '}
          <p className="text-text font-medium">
            1425 Maplewood Ave, Suite 204 Brooklyn, NY 11211 United States
          </p>
        </div>
      </div>
    </div>
  )
}
