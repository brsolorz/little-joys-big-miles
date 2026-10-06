'use client';
import type {Event} from '@/lib/fundraiser';
import {googleCalendarURL} from '@/lib/event-calendar';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from '@/components/ui/dropdown-menu';
export default function EventCalendar({event}:{event:Event}){const url='/api/events/'+encodeURIComponent(event.id)+'/calendar';return <DropdownMenu><DropdownMenuTrigger asChild><button className="button outline small">Add to calendar</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem asChild><a href={googleCalendarURL(event)} target="_blank" rel="noreferrer">Google Calendar</a></DropdownMenuItem><DropdownMenuItem asChild><a href={url}>Apple Calendar / Outlook / other (.ics)</a></DropdownMenuItem></DropdownMenuContent></DropdownMenu>}
