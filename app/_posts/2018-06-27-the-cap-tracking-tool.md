Evelin Heidel ([@scannopolis](https://twitter.com/scannopolis) on Twitter,) recently asked me to document our Caselaw Access Project ([website](https://lil.law.harvard.edu/projects/caselaw-access-project/), [video](https://www.youtube.com/watch?v=kwlN_vhai84)) digitization workflow, and open up the source for the CAP "Tracking Tool." I'll dig into our digitization workflow in my next post, but in this post, I'll discuss the Tracking Tool or TT for short. I created the TT to track CAP's physical and digital objects and their associated metadata. More specifically, it:

- Tracked the physical book from receipt, to scanning, to temporary storage, to permanent storage
- Served as a repository for book metadata, some of which was retrieved automatically through internal APIs, but most of which was keyed in by hand
- Tracked the digital objects from scanning to QA, to upload, to receipt from our XML vendor 
- Facilitated sending automated delivery requests to the Harvard Depository, which stored most of our reporters 
- Provided reports on the progress of the project and the fitness of the data we were receiving from our XML vendor

If I might toot my own horn, I'd say it drastically improved the efficiency and accuracy of the project, so it's no wonder Evelin is not the first person to request I open up the source. If doing so were a trivial undertaking I certainly wouldn't hesitate, but it's not. While we have a policy of making all new projects public by default in LIL, that was not the case in the position I held when I created the tracking tool. And while there's nothing particularly sensitive in the code, I'm not comfortable releasing it without a thorough review. I also don't believe that after all that work the code would be particularly useful to people. There's so much technical debt, and it's so tightly coupled with our process, data, vendors, and institutional resources that I'm sure adapting it to a new project would take significantly more effort than starting over. I'm confident that development of [Capstone](https://github.com/harvard-lil/capstone/) — the tool which manages and distributes the fruits of this project — is a much better use of my time.

Please allow me to expound.

## The Tracking Tool - The Not So Great Parts

During the project's conception in 2013, I conceived of the TT as a small utility to track metadata and log the receipt, scanning, and shipping of casebooks. Turning a small utility into a monolithic data management environment by continually applying ad hoc enhancements under significant time constraint is the perfect recipe for technical debt, and that's precisely what we ended up with. 

S3 bucket names are hard-coded into models. Recipient's email addresses are hard-coded into automated reports. Tests? Ha! 

The only flexibility I designed into the application, such as being able to configure the steps each volume would proceed through during the digitization process, was to mitigate not knowing exactly what the workflow would look like when I started coding, not because I was trying to make a general-purpose tool. It was made, from the ground-up, to work with our project-specific idiosyncrasies. For example, code peppered throughout the application handles a volume's reporter series, which is a critical part of this workflow but nonexistent in most projects. Significant bits of functionality are based on access to internal Harvard APIs, or having data formatted in the CaseXML, VolumeXML, and ALTO formats.

If all of that wasn't enough, it's written in everybody's favorite language, PHP5, using Laravel 4, which was released in 2013, and isn't the most straightforward framework to upgrade. I maintain that this was a good design choice at the time, but it indeed isn't something I'd recommend adopting today.

Now that I've dedicated a pretty substantial chunk of this post to how the TT is a huge, flaming pile of garbage, let's jump right over to the "pro" column before I get fired.

## The Tracking Tool - The Better Parts

Despite all of its hacky bits, the TT is functional, stable, and does its jobs well. 

### Barcodes
Each book is identified in the TT by its barcode, so users can quickly bring up a book's metadata/event log screen with the wave of a barcode scanner. Harvard's cataloging system assigned most of the barcodes, but techs could generate new CAP-only barcodes for the occasional exception, such as when we received a book from another institution. Regardless of the barcode's source, all books need to have an entry in the TT's database. Techs could create those entries individually if necessary, but most often would create them in bulk. If the book has a cataloging system barcode, it pulls some metadata, such as the volume number and publication year, from the cataloging API.

### Reporters
A crucial part of the metadata and organization of this tool is the reporter table — a hand-compiled list of every reporter series' in the scope of this project. Several expert law librarians constructed the table by combing through a few hundred years of Harvard cataloging data, which after many generations of library management and cataloging systems, had varying levels of accuracy. If you're interested, check out our [master reporter list on github](https://github.com/harvard-lil/reporter-list)! The application guesses each volume's reporter based on its HOLLIS number — another internal cataloging identifier — but needs to be double-checked by the tech.

### Automated Expertise
There are several data points created during the in-hand metadata analysis stage which would trigger outside review. If a book was automatically determined to be *rare* using a set of criteria determined by our Special Collections department, or the tech flagged it as needing bibliographic review, the TT included the barcode in its daily email to their respective groups of specialists. 

### Process Steps and Book Logs
The system has a configurable set of process steps each volume must complete, such as in-hand metadata analysis or scanning, with configurable prerequisites. Such a system ensures all books proceed through all of the steps, in the intended order, and facilitates very granular progress reports. Each step is recorded in the book's log, which also contains: 
- *Info Entries:* e.g., user x changed the publication year for this book
- *Warnings:* e.g.,  the scan job was put on hold
- *Exceptions:* e.g., the scanned book failed the QA test.

### Control Flow
Each of those process steps has a configurable set of prerequisites. For example, to mark a book as "analyzed," it must have several metadata elements recorded. To mark it as "stored on X shelf," the log must contain a "scanned" event. 

If a supervisor needs to track down a book during the digitization process, they can put that book "on hold." The next person to scan that barcode sees a prominent warning and must engage with a confirmation prompt before taking any action. Generally, the person who placed the volume on hold would put instructions in the volume's notes field.

### Efficiency
Accessing each volume page to record an event, such as receipt of a book from the repository, is terribly inefficient with more than a few books. In the streamlined mode, techs specify a process step which they can bulk-apply to any book by scanning its barcode. An audio cue indicates whether or not the status was applied correctly, so the technician doesn't even have to look a the computer unless there's a problem.

### External Communication
The TT has a simple REST API to communicate with daemons that run on other systems. Through the API, external processes can trigger uploading metadata once the file upload is complete, monitor our scanner output, discover newly uploaded objects from our vendor, sync scan timestamp and QA status, and a few other things. 

### Quality Assurance
Within the TT lies a system to inspect the output received from our XML vendor. The user can view statistics about the number volumes received per state or jurisdiction, drill down to see XML tag statistics at different levels of granularity, or even drill down to individual cases where you can view page images overlaid with interactive ALTO text. The higher-level overviews were quite useful in ironing out some vendor process problems.

## The Long and Short of It

The tracking tool was an invaluable part of the CAP workflow, but vast swaths of the code would only be useful to people replicating this exact project, using Harvard's internal cataloging systems, using the highly automated scanner we used configured precisely like ours, and receiving XML in the exact format we designed for this project. While a subset of the TT's features would be pretty useful to most people doing book digitization, **I am very confident that anybody interested in using it would be much better off creating a more straightforward, more generalizable tool from scratch, using a better language.** I've considered starting a more generalizable, open source tool for digitization projects, but if someone else gets to it first, I'd be happy to discuss the architectural wisdom I've gained by writing the TT. If someone knows of another open source project already doing this, let me know; I'd love to check it out. Reach out to [lil@law.harvard.edu](mailto:lil@law.harvard.edu) with any questions, comments, or hate mail!
